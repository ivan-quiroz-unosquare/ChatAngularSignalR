using ChatAppBackend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ChatAppBackend.Repositories
{
    public interface IAccountRepository
    {
        Task<IActionResult> Register(RegisterUser user);
        Task<IActionResult> Login(string authorization);
        Task<IActionResult> Logout(string username);
        Task<IActionResult> RefreshToken(HttpContext httpContext);
    }
}
