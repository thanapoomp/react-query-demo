using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactQueryApi.DTOs
{
    public class ProductGroupDTO_ToReturn
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool? IsActive { get; set; }
        public string DisplayImage { get; set; }
        public Guid? CreatedUserId { get; set; }
        public string CreatedUserUsername { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? UpdatedUserId { get; set; }
        public string UpdatedUserUsername { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
