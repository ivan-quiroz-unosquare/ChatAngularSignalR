using Microsoft.AspNetCore.Mvc;

namespace ChatAppBackend.Repositories
{
    public interface IChatRepository
    {
        Task<IActionResult> GetMessages();
        Task<IActionResult> SendMessage();
    }
}
