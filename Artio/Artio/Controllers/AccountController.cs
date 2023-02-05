using Artio.ViewModels;
using BLL.Abstractions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Artio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginViewModel user)
        {
            try
            {
                var token = await _accountService.LoginAsync(user.Username, user.Password);

                return Ok(token.Replace("\"", string.Empty));
            }
            catch (InvalidOperationException ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (await _accountService.RegistrateAsync(model.Username, model.Password))
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}
