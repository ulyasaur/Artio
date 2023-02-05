using BLL.Abstractions;
using Core.Entitites;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class AccountService : IAccountService
    {
        private readonly ITokenService _tokenService;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ILogger<AccountService> _logger;

        public AccountService(
            ITokenService tokenService,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            RoleManager<IdentityRole> roleManager,
            ILogger<AccountService> logger)
        {
            _tokenService = tokenService;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _logger = logger;
        }

        public async Task<string> LoginAsync(string username, string password)
        {
            var logged = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName.Equals(username));

            if (logged is null)
            {
                throw new InvalidOperationException("User not found");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(logged, password, false);

            var roles = await _userManager.GetRolesAsync(logged);

            if (result.Succeeded)
            {
                return _tokenService.GenerateToken(logged, roles.ToList());
            }

            throw new InvalidOperationException("Incorrect password");
        }

        public async Task<bool> RegistrateAsync(string username, string password)
        {
            User user = new User
            {
                UserName = username
            };

            if (await IsThereSuchLoginAsync(username))
            {
                _logger.LogError("Validation exception user with such login already exists");
                return false;
            }

            IdentityResult result;

            try
            {
                result = await _userManager.CreateAsync(user, password);
            }
            catch
            {
                _logger.LogError("Validation exception problems when creating a user");
                return false;
            }

            if (result.Succeeded)
            {
                var defaultRole = await _roleManager.FindByNameAsync("User");
                if (defaultRole != null)
                {
                    var roleResult = await _userManager.AddToRoleAsync(user, defaultRole.Name);
                }
                return true;
            }
            else
            {
                _logger.LogError(result.ToString());
                return false;
            }

        }

        private async Task<bool> IsThereSuchLoginAsync(String login)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == login);
        }

        public async Task<bool> ChangePasswordAsync(string username, string oldPassword, string newPassword)
        {
            User? user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName.Equals(username));

            if (user is null)
            {
                throw new InvalidOperationException("User was not found.");
            }

            IdentityResult result = await _userManager.ChangePasswordAsync(user, oldPassword, newPassword);

            return result.Succeeded;
        }
    }
}
