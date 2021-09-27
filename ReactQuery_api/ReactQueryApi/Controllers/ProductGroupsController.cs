using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactQueryApi.DTOs;
using ReactQueryApi.Services.ProductGroup;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactQueryApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductGroupsController : ControllerBase
    {
        private readonly IProductGroupService _service;

        public ProductGroupsController(IProductGroupService service)
        {
            this._service = service;
        }

        [HttpGet()]
        public async Task<IActionResult> GetProductGroups()
        {
            return Ok(await _service.GetProductGroups());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductGroup(Guid id)
        {
            return Ok(await _service.GetProductGroupById(id));
        }

        [HttpGet("Filter")]
        public async Task<IActionResult> GetProductGroupPaginated([FromQuery] ProductGroupDTO_Filter input)
        {
            return Ok(await _service.GetProductGroupfilter(input));
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateProductGroup(ProductGroupDTO_ToCreate input)
        {
            return Ok(await _service.CreateProductGroup(input));
        }

        [HttpPost("Update")]
        public async Task<IActionResult> UpdateProductGroup(ProductGroupDTO_ToUpdate input)
        {
            return Ok(await _service.UpdateProductGroup(input));
        }

        [HttpPost("Delete")]
        public async Task<IActionResult> DeleteProductGroup(Guid id)
        {
            return Ok(await _service.DeleteProductGroup(id));
        }
    }
}
