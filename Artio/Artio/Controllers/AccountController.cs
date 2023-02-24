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

        private readonly IUserService _userService;

        private readonly IMapper _mapper;

        public AccountController(IAccountService accountService, IUserService userService, IMapper mapper)
        {
            _accountService = accountService;
            _userService = userService;
            _mapper = mapper;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginViewModel user)
        {
            try
            {
                var token = await _accountService.LoginAsync(user.Username, user.Password);

                User userInfo = await this._userService.GetUserByUsernameAsync(user.Username);

                AuthResponseViewModel authResponse = new AuthResponseViewModel();
                authResponse.Token = token.Replace("\"", string.Empty);
                authResponse.User = new UserViewModel();
                this._mapper.Map(userInfo, authResponse.User);

                return Ok(authResponse);
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
