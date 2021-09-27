using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactQueryApi.DTOs
{
    public class ContactDTO_ToReturn
    {
        public Guid Id { get; set; }
        public TitleDTO_ToReturn Title { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public bool? IsActive { get; set; }
        public Guid? CreatedUserId { get; set; }
        public string CreatedUserUsername { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? UpdatedUserId { get; set; }
        public string UpdatedUserUsername { get; set; }
        public DateTime? UpdatedDate { get; set; }

    }
}
