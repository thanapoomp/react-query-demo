using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactQueryApi.Clients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactQueryApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApiExampleController : ControllerBase
    {
        private readonly ShortLinkClient _shortLinkClient;
        private readonly SendSmsClient _sendSmsClient;

        public ApiExampleController(ShortLinkClient shortLinkClient, SendSmsClient sendSmsClient)
        {
            _shortLinkClient = shortLinkClient;
            _sendSmsClient = sendSmsClient;
        }

        [HttpPost("ShortLink/Create")]
        public async Task<string> ShortLinkCreate([FromQuery] string url)
        {
            var response = await _shortLinkClient.GenerateLinkShortenAsync(url, new DateTime(2020,1,1));
            return response.ShortURL;
        }
    }
}
