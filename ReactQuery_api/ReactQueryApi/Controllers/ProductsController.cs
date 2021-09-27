using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactQueryApi.DTOs;
using ReactQueryApi.Services.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactQueryApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _service;

        public ProductsController(IProductService service)
        {
            this._service = service;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(Guid id)
        {
            return Ok(await _service.GetProductById(id));
        }

        [HttpGet("Filter")]
        public async Task<IActionResult> GetProductPaginated([FromQuery] ProductDTO_Filter input)
        {
            return Ok(await _service.GetProductfilter(input));
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateProduct(ProductDTO_ToCreate input)
        {
            return Ok(await _service.CreateProduct(input));
        }

        [HttpPost("Update")]
        public async Task<IActionResult> UpdateProduct(ProductDTO_ToUpdate input)
        {
            return Ok(await _service.UpdateProduct(input));
        }

        [HttpPost("Delete")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            return Ok(await _service.DeleteProduct(id));
        }
    }
}
