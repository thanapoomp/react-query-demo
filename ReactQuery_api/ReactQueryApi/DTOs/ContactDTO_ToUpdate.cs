using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactQueryApi.DTOs
{
    public class ContactDTO_ToUpdate
    {
        public Guid Id { get; set; }
        public Guid? TitleId { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
    }
}
