using ChatAppBackend.Entities;
using ChatAppBackend.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChatAppBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;

        public AccountController(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Register(RegisterUser user)
        {
            return await _accountRepository.Register(user);
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> Login()
        {
            var authorizationHeader = HttpContext.Request.Headers.Authorization;
            if (authorizationHeader.Count == 0) return Unauthorized();
            return await _accountRepository.Login(authorizationHeader);
        }

        [HttpDelete]
        [Route("[action]")]
        public async Task<IActionResult> Logout([FromHeader] string username)
        {
            return await _accountRepository.Logout(username);
        }

        [HttpGet]
        [Route("[action]")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> RefreshToken()
        {
            return await _accountRepository.RefreshToken(HttpContext);
        }
    }
}
