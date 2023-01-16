using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ChatAppBackend.Entities
{
    public class MessageDTO
    {
        [Required]
        [JsonProperty("content")]
        public string Content { get; set; }

        [Required]
        [JsonProperty("userName")]
        public string UserName { get; set; }

        [Required]
        [JsonProperty("date")]
        public DateTimeOffset Date { get; set; }
    }
}
