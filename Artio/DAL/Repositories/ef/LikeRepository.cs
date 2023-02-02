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
    public class LikeRepository : ILikeRepository
    {
        private readonly ApplicationContext _context;

        private readonly ILogger<LikeRepository> _logger;

        public LikeRepository(ApplicationContext context, ILogger<LikeRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task AddLike(Like like)
        {
            try
            {
                this._context.Likes.Add(like);
                await this._context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task DeleteLike(string userId, int postId)
        {
            try
            {
                Like like = await this._context.Likes.SingleAsync(l => l.UserId == userId && l.PostId == postId);

                this._context.Likes.Remove(like);
                await this._context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<List<Like>> GetAllLikes(Expression<Func<Like, bool>> filter)
        {
            try
            {
                return await this._context.Likes.Where(filter).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }
    }
}
