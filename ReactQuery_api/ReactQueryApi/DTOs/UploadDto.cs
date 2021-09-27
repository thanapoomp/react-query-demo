using Microsoft.AspNetCore.Http;
using ReactQueryApi.Validations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ReactQueryApi.DTOs
{
    public class UploadDto
    {
        [Required]
        [FileSizeValidator(1)]
        [ContentTypeValidator(ContentTypeValidator.ContentTypeGroup.Image)]
        public IFormFile UploadFile { get; set; }

        [Required]
        public string Container { get; set; }
        
    }
}
