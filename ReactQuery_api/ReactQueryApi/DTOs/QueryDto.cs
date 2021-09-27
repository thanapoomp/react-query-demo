using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactQueryApi.DTOs
{
    public class QueryDto
    {
        /// <summary>
        /// คอลัมน์ที่ใช้ในการค้นหา
        /// </summary>
        /// <example>Name</example>
        public string Column { get; set; } = null;
        /// <summary>
        /// ค้นที่ใช้ในการค้นหา
        /// </summary>
        public string Filter { get; set; } = null;

        public string OrderBy { get; set; } = null;
        public string Ordering { get; set; } = null;

    }
}
