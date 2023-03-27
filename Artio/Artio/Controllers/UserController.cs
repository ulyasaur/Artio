using Artio.Services.Abstractions;
using Artio.ViewModels;
using AutoMapper;
using BLL.Abstractions;
using Core.Entitites;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Artio.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        private readonly IUserAccessor _userAccessor;

        private readonly ILogger<UserController> _logger;

        private readonly IMapper _mapper;

        public UserController(IUserService userService, IUserAccessor userAccessor, ILogger<UserController> logger, IMapper mapper)
        {
            _userService = userService;
            _userAccessor = userAccessor;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet("{targetId}/followers")]
        public async Task<IActionResult> GetFollowers(string targetId)
        {
            try
            {
                List<User> users = await this._userService.GetFollowersAsync(targetId);

                List<UserViewModel> followers = new List<UserViewModel>();

                this._mapper.Map(users, followers);

                return Ok(followers);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{observerId}/followings")]
        public async Task<IActionResult> GetFollowings(string observerId)
        {
            try
            {
                List<User> users = await this._userService.GetFollowingsAsync(observerId);

                List<UserViewModel> followings = new List<UserViewModel>();

                this._mapper.Map(users, followings);

                return Ok(followings);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("search/{search}")]
        public async Task<IActionResult> GetUsersBySearch(string search)
        {
            try
            {
                List<User> users = await this._userService.GetUsersBySearch(search);

                List<UserViewModel> searchedUsers = new List<UserViewModel>();

                this._mapper.Map(users, searchedUsers);

                return Ok(searchedUsers);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("id/{userId}")]
        public async Task<IActionResult> GetUserById(string userId)
        {
            try
            {
                User user = await this._userService.GetUserByIdAsync(userId);

                UserProfileViewModel profile = new UserProfileViewModel();

                this._mapper.Map(user, profile);

                return Ok(profile);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetUserByUsername(string username)
        {
            try
            {
                User user = await this._userService.GetUserByUsernameAsync(username);

                UserProfileViewModel profile = new UserProfileViewModel();

                this._mapper.Map(user, profile);

                return Ok(profile);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> EditUser(UserUpdateViewModel userUpdateViewModel)
        {
            try
            {
                User user = new User();

                this._mapper.Map(userUpdateViewModel, user);

                user.Id = this._userAccessor.GetUserId();

                await this._userService.UpdateUserAsync(user);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPost("profilePicture")]
        public async Task<IActionResult> SetProfilePicture(IFormFile file)
        {
            try
            {
                string userId = this._userAccessor.GetUserId();

                Photo photo = await this._userService.SetProfilePicture(userId, file);

                PhotoViewModel photoViewModel = new PhotoViewModel();
                this._mapper.Map(photo, photoViewModel);

                return Ok(photoViewModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPost("profileBackground")]
        public async Task<IActionResult> SetProfileBackground(IFormFile file)
        {
            try
            {
                string userId = this._userAccessor.GetUserId();

                Photo photo = await this._userService.SetBackgroundPicture(userId, file);

                PhotoViewModel photoViewModel = new PhotoViewModel();
                this._mapper.Map(photo, photoViewModel);

                return Ok(photoViewModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            try
            {
                await _userService.DeleteUserAsync(userId);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{targetId}")]
        public async Task<IActionResult> ToggleFollow(string targetId)
        {
            try
            {
                string observerId = this._userAccessor.GetUserId();

                await this._userService.ToggleFollowAsync(observerId, targetId);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPost("tag/{tagId}")]
        public async Task<IActionResult> AddTagToUser(int tagId)
        {
            try
            {
                string userId = this._userAccessor.GetUserId();

                await this._userService.AddTagToUserAsync(userId, tagId);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("tag/{tagId}")]
        public async Task<IActionResult> DeleteTagFromUser(int tagId)
        {
            try
            {
                string userId = this._userAccessor.GetUserId();

                await this._userService.DeleteTagFromUserAsync(userId, tagId);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }
    }
}
