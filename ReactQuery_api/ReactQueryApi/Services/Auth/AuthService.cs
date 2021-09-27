﻿using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ReactQueryApi.Configurations;
using ReactQueryApi.Data;
using ReactQueryApi.DTOs;
using ReactQueryApi.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace ReactQueryApi.Services
{
    public class AuthService : ServiceBase, IAuthService
    {
        private readonly ReactQueryContext _db;
        private readonly IMapper _mapper;
        private readonly Jwt _configuration;

        /// Constructor
        public AuthService(IHttpContextAccessor httpContext,
            ReactQueryContext db,
            IMapper mapper,
            IOptions<Jwt> configuration) : base(db, mapper, httpContext)
        {
            _db = db;
            _mapper = mapper;
            _configuration = configuration.Value;
        }

        public async Task<ServiceResponse<string>> Login(UserLoginDto userLoginDto)
        {
            User user = await _db.Users.SingleOrDefaultAsync(x => x.Username.ToLower().Equals(userLoginDto.Username.ToLower()));

            if (user == null)
            {
                return ResponseResult.NotFound<string>("User");
            }

            if (!VerifyPasswordhash(userLoginDto.Password, user.PasswordHash, user.PasswordSalt))
            {
                return ResponseResult.Failure<string>("Wrong password");
            }

            var token = CreateToken(user);

            return ResponseResult.Success(token);
        }

        public async Task<ServiceResponse<string>> Register(UserRegisterDto userRegisterDto)
        {
            if (await UserExists(userRegisterDto.Username))
            {
                return ResponseResult.Failure<string>("User already exists");
            }

            CreatePasswordHash(userRegisterDto.Password, out byte[] passwordHash, out byte[] passwordSalt);

            User user = new User
            {
                Id = Guid.NewGuid(),
                Username = userRegisterDto.Username,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            _db.Users.Add(user);

            await _db.SaveChangesAsync();

            var token = CreateToken(user);

            return ResponseResult.Success(token);
        }

        public async Task<bool> UserExists(string username)
        {
            if (await _db.Users.AnyAsync(x => x.Username.ToLower() == username.ToLower()))
            {
                return true;
            }
            return false;
        }

        private bool VerifyPasswordhash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computeHash.Length; i++)
                {
                    if (computeHash[i] != passwordHash[i])
                    {
                        return false;
                    }
                }
                return true;
            }
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username)
            };

            // add role in token
            var userRoles = _db.UserRoles.AsNoTracking().Include(x => x.Role).Where(x => x.UserId == user.Id).ToList();

            foreach (var item in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, item.Role.Name));
            };
            // End : add role in token

            var sck = _configuration.key;

            SymmetricSecurityKey key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration.key));

            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var minutes = int.Parse(_configuration.minute);

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(minutes),
                SigningCredentials = creds
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public async Task<ServiceResponse<List<UserDto>>> GetUsers()
        {
            var data = await Get<User, UserDto>();
            return ResponseResult.Success(data);
        }

        public async Task<ServiceResponse<List<RoleDto>>> GetRoles()
        {
            var data = await Get<Role, RoleDto>();
            return ResponseResult.Success(data);
        }

        public async Task<ServiceResponse<List<UserRoleDto>>> AssignRole(AssignRoleDto assignRoleDto)
        {
            //get userId
            User user = await _db.Users.SingleOrDefaultAsync(x => x.Username == assignRoleDto.Username);

            if (user == null)
            {
                return ResponseResult.Failure<List<UserRoleDto>>("Not Found : User not found");
            };

            //remove all roles
            List<UserRole> oldUserRoles = await _db.UserRoles.Where(x => x.UserId == user.Id).ToListAsync();
            _db.UserRoles.RemoveRange(oldUserRoles);

            //add new roles
            List<UserRole> userRoles = new List<UserRole>();
            Role role;

            foreach (var roleDto in assignRoleDto.Roles)
            {
                role = await _db.Roles.SingleOrDefaultAsync(x => x.Name == roleDto.RoleName);

                if (role != null)
                {
                    userRoles.Add(new UserRole { RoleId = role.Id, UserId = user.Id });
                }
            };

            _db.UserRoles.AddRange(userRoles);
            await _db.SaveChangesAsync();

            var dto = _mapper.Map<List<UserRoleDto>>(userRoles);

            return ResponseResult.Success(dto);
        }

        public async Task<ServiceResponse<string>> Renew()
        {
            string username = GetUsername().ToLower();
            User user = await _db.Users.SingleAsync(x => x.Username.ToLower().Equals(username));
            var token = CreateToken(user);
            return ResponseResult.Success(token);
        }

        public async Task<ServiceResponse<RoleDto>> AddRole(RoleDtoAdd newRole)
        {
            try
            {
                var data = await Post<RoleDtoAdd, Role, RoleDto>(newRole);
                return ResponseResult.Success(data);
            }
            catch (Exception ex)
            {
                return ResponseResult.Failure<RoleDto>($"Bad Request : {ex.Message}");
            }
        }

        public async Task<ServiceResponse<RoleDto>> UpdateRole(string guid, RoleDtoAdd newRole)
        {
            try
            {
                var data = await Put<RoleDtoAdd, Role, RoleDto>(guid, newRole);
                return ResponseResult.Success(data);
            }
            catch (Exception ex)
            {
                return ResponseResult.Failure<RoleDto>($"Bad Request : {ex.Message}");
            }
        }

        public async Task<ServiceResponse<RoleDto>> DeleteRole(string guid)
        {
            try
            {
                var data = await Delete<Role, RoleDto>(guid);
                return ResponseResult.Success(data);
            }
            catch (Exception ex)
            {
                return ResponseResult.Failure<RoleDto>($"Bad Request : {ex.Message}");
            }
        }

        public async Task<ServiceResponse<UserDto>> GetUserById(string guid)
        {
            try
            {
                var data = await Get<User, UserDto>(guid);
                return ResponseResult.Success(data);
            }
            catch (Exception ex)
            {
                return ResponseResult.Failure<UserDto>($"Bad Request : {ex.Message}");
            }
        }
    }
}