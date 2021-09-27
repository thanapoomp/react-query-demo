using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactQueryApi.DTOs;
using ReactQueryApi.Services.Contact;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactQueryApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IContactService _service;

        public ContactsController(IContactService service)
        {
            this._service = service;
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetContact(Guid id)
        {
            return Ok(await _service.GetContactById(id));
        }

        [HttpGet("Filter")]
        public async Task<IActionResult> GetContactPaginated([FromQuery]ContactDTO_Filter input)
        {
            return Ok(await _service.GetContactfilter(input));
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateContact(ContactDTO_ToCreate input)
        {
            return Ok(await _service.CreateContact(input));
        }

        [HttpPost("Update")]
        public async Task<IActionResult> UpdateContact(ContactDTO_ToUpdate input)
        {
            return Ok(await _service.UpdateContact(input));
        }

        [HttpPost("Delete")]
        public async Task<IActionResult> DeleteContact(Guid id)
        {
            return Ok(await _service.DeleteContact(id));
        }
    }
}
