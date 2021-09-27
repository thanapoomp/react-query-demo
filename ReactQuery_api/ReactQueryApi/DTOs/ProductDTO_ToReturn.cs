using ReactQueryApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactQueryApi.DTOs
{
    public class ProductDTO_ToReturn
    {
        public Guid Id { get; set; }
        public ProductGroupDTO_ToReturn ProductGroup { get; set; }
        public string Name { get; set; }
        public decimal? Price { get; set; }
        public decimal? Stock { get; set; }
        public Guid? CreatedUserId { get; set; }
        public string CreatedUserUsername { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? UpdatedUserId { get; set; }
        public string UpdatedUserUsername { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool? IsAcTive { get; set; }
    }
}
