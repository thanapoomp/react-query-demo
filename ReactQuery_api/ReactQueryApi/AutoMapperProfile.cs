using AutoMapper;
using ReactQueryApi.DTOs;
using ReactQueryApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactQueryApi
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<Role, RoleDto>()
                .ForMember(x => x.RoleName, x => x.MapFrom(x => x.Name));
            CreateMap<RoleDtoAdd, Role>()
                .ForMember(x => x.Name, x => x.MapFrom(x => x.RoleName)); ;
            CreateMap<UserRole, UserRoleDto>();

            CreateMap<Contact, ContactDTO_ToReturn>().ReverseMap();
            CreateMap<Product, ProductDTO_ToReturn>().ReverseMap();
            CreateMap<ProductGroup, ProductGroupDTO_ToReturn>().ReverseMap();
            CreateMap<Title, TitleDTO_ToReturn>().ReverseMap();

        }
    }
}