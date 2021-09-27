using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ReactQueryApi.Data;
using ReactQueryApi.DTOs;
using ReactQueryApi.Helpers;
using ReactQueryApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;

namespace ReactQueryApi.Services.Contact
{
    public class ContactService : ServiceBase, IContactService
    {
        private readonly IMapper _mapper;
        private readonly ReactQueryContext _dBContext;
        private readonly ILogger<ContactService> _log;
        private readonly IHttpContextAccessor _httpContext;
        public ContactService(IMapper mapper, IHttpContextAccessor httpContext, ReactQueryContext dBContext, ILogger<ContactService> log) : base(dBContext, mapper, httpContext)
        {
            this._httpContext = httpContext;
            this._log = log;
            this._mapper = mapper;
            this._dBContext = dBContext;
        }

        /// <summary>
        /// Create
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<ContactDTO_ToReturn>> CreateContact(ContactDTO_ToCreate input)
        {
            //validate titleId exsist
            var titleExsist = await TitleExsist(input.TitleId.Value);

            if (!titleExsist)
            {
                return ResponseResult.Failure<ContactDTO_ToReturn>($"Title {input.TitleId} not exsist");
            }

            var itemToCreate = new Models.Contact();
            itemToCreate.Id = Guid.NewGuid();
            itemToCreate.TitleId = input.TitleId;
            itemToCreate.FirstName = input.FirstName;
            itemToCreate.LastName = input.LastName;
            itemToCreate.PhoneNumber = input.PhoneNumber;
            itemToCreate.Email = input.Email;
            itemToCreate.IsActive = true;
            itemToCreate.CreatedUserId =  new Guid(GetUserId());
            itemToCreate.UpdatedUserId = new Guid(GetUserId());
            itemToCreate.CreatedDate = DateTime.Now;
            itemToCreate.UpdatedDate = DateTime.Now;

            await _dBContext.Contacts.AddAsync(itemToCreate);
            await _dBContext.SaveChangesAsync();

            var result = _mapper.Map<ContactDTO_ToReturn>(itemToCreate);
            return ResponseResult.Success(result);
        }

        /// <summary>
        /// Update
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<ContactDTO_ToReturn>> UpdateContact(ContactDTO_ToUpdate input)
        {
            //validate contact exsist
            var contactExsist = await ContactExsist(input.Id);

            if (!contactExsist)
            {
                return ResponseResult.Failure<ContactDTO_ToReturn>($"Contact {input.Id} not exsist");
            }

            //validate titleId exsist
            var titleExsist = await TitleExsist(input.TitleId.Value);

            if (!titleExsist)
            {
                return ResponseResult.Failure<ContactDTO_ToReturn>($"Title {input.TitleId} not exsist");
            }

            var itemToUpdate = await _dBContext.Contacts
                .Where(x => x.Id == input.Id)
                .Include(x => x.CreatedUser)
                .Include(x => x.UpdatedUser)
                .FirstOrDefaultAsync();
            itemToUpdate.TitleId = input.TitleId;
            itemToUpdate.FirstName = input.FirstName;
            itemToUpdate.LastName = input.LastName;
            itemToUpdate.PhoneNumber = input.PhoneNumber;
            itemToUpdate.Email = input.Email;
            itemToUpdate.UpdatedUserId = new Guid(GetUserId());
            itemToUpdate.UpdatedDate = DateTime.Now;

            await _dBContext.SaveChangesAsync();

            var result = _mapper.Map<ContactDTO_ToReturn>(itemToUpdate);
            return ResponseResult.Success(result);
        }

        /// <summary>
        /// Delete
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<ContactDTO_ToReturn>> DeleteContact(Guid id)
        {
            //validate contact exsist
            var contactExsist = await ContactExsist(id);

            if (!contactExsist)
            {
                return ResponseResult.Failure<ContactDTO_ToReturn>($"Contact {id} not exsist");
            }

            var itemToDelete = await _dBContext.Contacts
                                .Where(x => x.Id == id)
                                .Include(x => x.CreatedUser)
                                .Include(x => x.UpdatedUser)
                                .FirstOrDefaultAsync();
            itemToDelete.IsActive = false;
            itemToDelete.UpdatedUserId = new Guid(GetUserId());
            itemToDelete.UpdatedDate = DateTime.Now;

            await _dBContext.SaveChangesAsync();

            var result = _mapper.Map<ContactDTO_ToReturn>(itemToDelete);
            return ResponseResult.Success(result);
        }

        /// <summary>
        /// Get By Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<ContactDTO_ToReturn>> GetContactById(Guid id)
        {
            //validate contact exsist
            var contactExsist = await ContactExsist(id);

            if (!contactExsist)
            {
                return ResponseResult.Failure<ContactDTO_ToReturn>($"Contact {id} not exsist");
            }

            var contactToReturn = await _dBContext.Contacts
                                .Where(x => x.Id == id)
                                .Include(x => x.CreatedUser)
                                .Include(x => x.UpdatedUser)
                                .FirstOrDefaultAsync();

            var result = _mapper.Map<ContactDTO_ToReturn>(contactToReturn);

            return ResponseResult.Success(result);
        }


        public async Task<ServiceResponse<List<ContactDTO_ToReturn>>> GetContactfilter(ContactDTO_Filter input)
        {
            var queryable = _dBContext.Contacts
                .Include(x => x.Title)
                .Include(x => x.CreatedUser)
                .Include(x => x.UpdatedUser)
                .AsQueryable();

            if (!string.IsNullOrEmpty(input.SearchText))
            {
                queryable = queryable.Where(x => x.FirstName.Contains(input.SearchText) 
                || x.LastName.Contains(input.SearchText)
                || x.PhoneNumber.Contains(input.SearchText)
                || x.Email.Contains(input.SearchText));
            }

            if (!string.IsNullOrWhiteSpace(input.OrderingField))
            {
                try
                {
                    queryable = queryable.OrderBy($"{input.OrderingField} {(input.AscendingOrder ? "ascending" : "descending")}");
                }
                catch
                {
                    return ResponseResultWithPagination.Failure<List<ContactDTO_ToReturn>>($"Could not order by field: {input.OrderingField}");
                }
            }

            //add data to pagination
            var paginationResult = await _httpContext.HttpContext.InsertPaginationParametersInResponse(queryable, input.RecordsPerPage, input.Page);

            var lstResult = await queryable.Paginate(input).ToListAsync();
            var resultDto = _mapper.Map<List<ContactDTO_ToReturn>>(lstResult);
            return ResponseResultWithPagination.Success(resultDto, paginationResult);
        }

        private async Task<bool> ContactExsist(Guid id)
        {
            var result = await _dBContext.Contacts.Where(x => x.Id == id).AnyAsync();
            return result;
        }

        private async Task<bool> TitleExsist (Guid id)
        {
            var result = await _dBContext.Titles.Where(x => x.Id == id).AnyAsync();
            return result;
        }


    }
}
