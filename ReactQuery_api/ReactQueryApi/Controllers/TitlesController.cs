using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactQueryApi.DTOs;
using ReactQueryApi.Services.Title;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactQueryApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TitlesController : ControllerBase
    {
        private readonly ITitleService _service;

        public TitlesController(ITitleService service)
        {
            this._service = service;
        }

        [HttpGet()]
        public async Task<IActionResult> GetTitles()
        {
            return Ok(await _service.GetTitles());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTitle(Guid id)
        {
            return Ok(await _service.GetTitleById(id));
        }

        [HttpGet("Filter")]
        public async Task<IActionResult> GetTitlePaginated([FromQuery]TitleDTO_Filter input)
        {
            return Ok(await _service.GetTitlefilter(input));
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateTitle(TitleDTO_ToCreate input)
        {
            return Ok(await _service.CreateTitle(input));
        }

        [HttpPost("Update")]
        public async Task<IActionResult> UpdateTitle(TitleDTO_ToUpdate input)
        {
            return Ok(await _service.UpdateTitle(input));
        }

        [HttpPost("Delete")]
        public async Task<IActionResult> DeleteTitle(Guid id)
        {
            return Ok(await _service.DeleteTitle(id));
        }
    }
}
