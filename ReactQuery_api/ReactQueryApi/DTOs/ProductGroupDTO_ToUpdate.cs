using ReactQueryApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactQueryApi.DTOs
{
    public class ProductGroupDTO_ToUpdate
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string DisplayImage { get; set; }
    }
}
