using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactQueryApi.DTOs;
using ReactQueryApi.Models;
using ReactQueryApi.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ReactQueryApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IStorageService _storageService;

        public UploadController(IStorageService storageService)
        {
            _storageService = storageService;
        }


        // POST api/<UploadController>/SaveFile
        [HttpPost("SaveFile")]
        public async Task<IActionResult> SaveFile([FromForm] UploadDto upload)
        {
            if (upload.UploadFile != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await upload.UploadFile.CopyToAsync(memoryStream);
                    var content = memoryStream.ToArray();
                    var extension = Path.GetExtension(upload.UploadFile.FileName);
                    var fileSize = upload.UploadFile.Length;
                    var fullUploadPath = await _storageService.SaveFile(content, extension, upload.Container, upload.UploadFile.ContentType);

                    var result = ResponseResult.Success(new { fullUploadPath, fileSize, extension });
                    return Ok(result);
                }
            }
            else
            {
                return BadRequest();
            }

        }
    }
}
