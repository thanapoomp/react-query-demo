﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactQueryApi.DTOs
{
    public class ProductGroupDTO_Filter: PaginationDto
    {
        public string SearchText { get; set; }
    }
}
