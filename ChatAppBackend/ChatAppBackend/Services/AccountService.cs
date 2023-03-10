using ChatAppBackend.Entities;
using ChatAppBackend.Hubs;
using ChatAppBackend.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ChatAppBackend.Services
{
    public class AccountService : IAccountRepository
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IChatRepository _chatRepository;

        public AccountService(UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IConfiguration configuration,
            IChatRepository chatRepository)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _chatRepository = chatRepository;
        }

        public async Task<IActionResult> Register(RegisterUser user)
        {
            var identityUser = new IdentityUser
            {
                UserName = user.UserName,
                Email = user.Email,
                EmailConfirmed = true,
            };

            var result = await _userManager.CreateAsync(identityUser, user.Password);

            if (!result.Succeeded) return new BadRequestObjectResult(result.Errors);

            return new CreatedAtRouteResult("Register", new { Email = user.Email, UserName = user.UserName });
        }

        public async Task<IActionResult> Login(string authentication)
        {
            var credentials = Encoding.UTF8.GetString(
                Convert.FromBase64String(authentication.Replace("Basic ", "")))
                .Split(':');
            var username = credentials.FirstOrDefault();
            var password = credentials.LastOrDefault();

            var result = await _signInManager.PasswordSignInAsync(username, password,
                isPersistent: false, lockoutOnFailure: false);

            if (!result.Succeeded) return new UnauthorizedObjectResult("Incorrect login!");

            await _chatRepository.UserConnected(username);
            await _chatRepository.GetActiveUsers();

            return new OkObjectResult(await GetToken(new UserCredentials { UserName = username }));
        }

        public async Task<IActionResult> Logout(HttpContext httpContext)
        {
            var username = httpContext.User.Claims.Where(claim => claim.Type.Equals("username")).FirstOrDefault()?.Value;
            await _chatRepository.UserDisconnected(username);
            return new NoContentResult();
        }

        public async Task<IActionResult> RefreshToken(HttpContext httpContext)
        {
            var username = httpContext.User.Claims.Where(claim => claim.Type.Equals("username")).FirstOrDefault()?.Value;
            var userCredentials = new UserCredentials
            {
                UserName = username,
            };

            return new OkObjectResult(await GetToken(userCredentials));
        }

        private async Task<AuthenticationResponse> GetToken(UserCredentials userCredentials)
        {
            var claims = new List<Claim>()
            {
                new Claim("username", userCredentials.UserName),
            };

            var user = await _userManager.FindByNameAsync(userCredentials.UserName);
            var claimsDB = await _userManager.GetClaimsAsync(user);

            claims.AddRange(claimsDB);
            claims.Add(new Claim("email", user.Email));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddDays(1);

            var token = new JwtSecurityToken(issuer: null, audience: null, claims: claims,
                expires: expiration, signingCredentials: credentials);

            return new AuthenticationResponse
            {
                Token = $"Bearer {new JwtSecurityTokenHandler().WriteToken(token)}",
                Expiration = expiration
            };
        }
    }
}
