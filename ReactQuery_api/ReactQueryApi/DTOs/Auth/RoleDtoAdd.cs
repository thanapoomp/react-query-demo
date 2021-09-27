using ReactQueryApi.Validations;
using System.ComponentModel.DataAnnotations;

namespace ReactQueryApi.DTOs
{
    public class RoleDtoAdd
    {
        [Required]
        [FirstLetterUpperCase]
        public string RoleName { get; set; }
    }
}