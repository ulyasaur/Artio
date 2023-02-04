using Core.Entitites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace DAL.Abstractions
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllUsersAsync(Expression<Func<User, bool>> filter);

        Task<List<User>> GetFollowersAsync(string targetId);

        Task<List<User>> GetFollowingsAsync(string observerId);

        Task<User> GetUserAsync(Expression<Func<User, bool>> filter);

        Task UpdateUserAsync(User user);

        Task DeleteUserAsync(string userId);

        Task AddUserFollowingAsync(string observerId, string targetId);

        Task DeleteUserFollowingAsync(string observerId, string targetId);

        Task AddTagToUserAsync(string userId, int tagId);

        Task DeleteTagFromUserAsync(string userId, int tagId);
    }
}
