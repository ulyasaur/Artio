using Core.Entitites;
using DAL.Abstractions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.ef
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationContext _context;

        private readonly ILogger<UserRepository> _logger;

        public UserRepository(ApplicationContext context, ILogger<UserRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task AddTagToUserAsync(string userId, int tagId)
        {
            try
            {
                this._context.UserTags.Add(new UserTag { UserId = userId, TagId = tagId });
                await this._context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task AddUserFollowingAsync(string observerId, string targetId)
        {
            try
            {
                this._context.UserFollowings.Add(new UserFollowing { ObserverId = observerId, TargetId = targetId });
                await this._context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task DeleteTagFromUserAsync(string userId, int tagId)
        {
            try
            {
                UserTag userTag = await this._context.UserTags.SingleAsync(u => u.UserId == userId && u.TagId == tagId);

                this._context.UserTags.Remove(userTag);
                await this._context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task DeleteUserAsync(string userId)
        {
            try
            {
                User user = await this._context.Users.SingleAsync(u => u.Id.Equals(userId));

                this._context.Users.Remove(user);
                await this._context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task DeleteUserFollowingAsync(string observerId, string targetId)
        {
            try
            {
                UserFollowing userFollowing = await this._context.UserFollowings
                    .SingleAsync(u => u.ObserverId.Equals(observerId) && u.TargetId.Equals(targetId));

                this._context.UserFollowings.Remove(userFollowing);
                await this._context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<List<User>> GetAllUsersAsync(Expression<Func<User, bool>> filter)
        {
            try
            {
                return await this._context.Users
                    .Include(u => u.Posts)
                    .Include(u => u.UserTags)
                        .ThenInclude(t => t.Tag)
                    .Include(u => u.Followers)
                        .ThenInclude(o => o.Observer)
                    .Include(u => u.Followings)
                        .ThenInclude(t => t.Target)
                    .Where(filter)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<List<User>> GetFollowersAsync(string targetId)
        {
            try
            {
                return await this._context.UserFollowings
                    .Include(o => o.Observer)
                    .Where(t => t.TargetId.Equals(targetId))
                    .Select(o => o.Observer)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<List<User>> GetFollowingsAsync(string observerId)
        {
            try
            {
                return await this._context.UserFollowings
                    .Include(o => o.Target)
                    .Where(t => t.ObserverId.Equals(observerId))
                    .Select(o => o.Target)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<User> GetUserAsync(Expression<Func<User, bool>> filter)
        {
            try
            {
                return await this._context.Users
                    .Include(u => u.Posts)
                    .Include(u => u.UserTags)
                        .ThenInclude(t => t.Tag)
                    .Include(u => u.Followers)
                        .ThenInclude(o => o.Observer)
                    .Include(u => u.Followings)
                        .ThenInclude(t => t.Target)
                    .SingleAsync(filter);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<UserFollowing> GetUserFollowing(string observerId, string targetId)
        {
            try
            {
                return await this._context.UserFollowings
                    .Include(t => t.Target)
                    .Include(o => o.Observer)
                    .FirstOrDefaultAsync(u => u.ObserverId.Equals(observerId) && u.TargetId.Equals(targetId));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task UpdateUserAsync(User user)
        {
            try
            {
                User dbUser = await this._context.Users.SingleAsync(u => u.Id.Equals(user.Id));

                dbUser.Bio = user.Bio;
                dbUser.DisplayName = user.DisplayName;
                //dbUser.ImageUrl = user.ImageUrl;

                await this._context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }
    }
}
