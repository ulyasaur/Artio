using Core.Entitites;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Abstractions
{
    public interface IUserService
    {
        Task<List<User>> GetFollowersAsync(string targetId);

        Task<List<User>> GetFollowingsAsync(string observerId);

        Task<User> GetUserByIdAsync(string userId);

        Task<List<User>> GetUsersBySearch(string search);

        Task<User> GetUserByUsernameAsync(string username);

        Task UpdateUserAsync(User user);

        Task<Photo> SetProfilePicture(string userId, IFormFile file);

        Task<Photo> SetBackgroundPicture(string userId, IFormFile file);

        Task DeleteUserAsync(string userId);

        Task ToggleFollowAsync(string observerId, string targetId);

        Task AddTagToUserAsync(string userId, int tagId);

        Task DeleteTagFromUserAsync(string userId, int tagId);
    }
}
