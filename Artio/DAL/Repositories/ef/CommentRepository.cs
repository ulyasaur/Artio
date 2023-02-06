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
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationContext _context;

        private readonly ILogger<CommentRepository> _logger;

        public CommentRepository(ApplicationContext context, ILogger<CommentRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task AddComment(Comment comment)
        {
            try
            {
                this._context.Comments.Add(comment);
                await this._context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task DeleteComment(int commentId)
        {
            if (commentId <= 0)
            {
                throw new ArgumentNullException("Comment id must be greater than 0");
            }

            try
            {
                Comment? comment = await this._context.Comments.SingleAsync(c => c.CommentId == commentId);

                this._context.Comments.Remove(comment);
                await this._context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<List<Comment>> GetAllComments(Expression<Func<Comment, bool>> filter)
        {
            try
            {
                return await this._context.Comments.Include(c => c.User).Where(filter).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<Comment> GetComment(Expression<Func<Comment, bool>> filter)
        {
            try
            {
                return await this._context.Comments.Include(c => c.User).SingleAsync(filter);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }
    }
}
