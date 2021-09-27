using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactQueryApi.DTOs
{
    public class ProductDTO_ToCreate
    {
        public Guid? ProductGroupId { get; set; }
        public string Name { get; set; }
        public decimal? Price { get; set; }
        public decimal? Stock { get; set; }
    }
}
