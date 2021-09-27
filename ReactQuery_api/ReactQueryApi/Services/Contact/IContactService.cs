using ReactQueryApi.DTOs;
using ReactQueryApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactQueryApi.Services.Contact
{
    public interface IContactService
    {
        Task<ServiceResponse<ContactDTO_ToReturn>> GetContactById(Guid id);
        Task<ServiceResponse<List<ContactDTO_ToReturn>>> GetContactfilter(ContactDTO_Filter input);

        Task<ServiceResponse<ContactDTO_ToReturn>> CreateContact(ContactDTO_ToCreate input);
        Task<ServiceResponse<ContactDTO_ToReturn>> UpdateContact(ContactDTO_ToUpdate input);
        Task<ServiceResponse<ContactDTO_ToReturn>> DeleteContact(Guid id);
    }
}
