using Artio.ViewModels;
using AutoMapper;
using BLL.Abstractions;
using Core.Entitites;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Artio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        private readonly IMapper _mapper;

        public AccountController(IAccountService accountService, IMapper mapper)
        {
            _accountService = accountService;
            _mapper = mapper;
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
            User user = new User();

            this._mapper.Map(model, user);

            if (await _accountService.RegistrateAsync(user, model.Password))
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}
