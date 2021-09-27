using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactQueryApi.Models
{
    public interface IId
    {
        public Guid Id { get; set; }
    }
}