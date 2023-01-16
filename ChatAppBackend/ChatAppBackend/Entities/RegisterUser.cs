using System.ComponentModel.DataAnnotations;

namespace ChatAppBackend.Entities
{
    public class RegisterUser
    {
        [Required(ErrorMessage = "The field {0} is required.")]
        [MaxLength(10, ErrorMessage = "The field {0} cannot have more than 10 characters.")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "The field {0} is required.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "The field {0} is required.")]
        public string Password { get; set; }
    }
}
