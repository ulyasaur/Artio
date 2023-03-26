using AutoMapper;
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
    public class PostRepository : IPostRepository
    {
        private readonly ApplicationContext _context;

        private readonly ILogger<PostRepository> _logger;

        private readonly IMapper _mapper;

        public PostRepository(ApplicationContext context, ILogger<PostRepository> logger, IMapper mapper)
        {
            _context = context;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task AddPostAsync(Post post)
        {
            try
            {
                this._context.Posts.Add(post);
                await this._context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task AddTagToPostAsync(int postId, int tagId)
        {
            try
            {
                this._context.PostTags.Add(new PostTag { PostId = postId, TagId = tagId });
                await this._context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task DeletePostAsync(int postId)
        {
            try
            {
                Post post = await this._context.Posts.SingleAsync(p => p.PostId == postId);

                this._context.Posts.Remove(post);
                await this._context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task DeleteTagFromPostAsync(int postId, int tagId)
        {
            try
            {
                PostTag postTag = await this._context.PostTags.SingleAsync(p => p.PostId == postId && p.TagId == tagId);

                this._context.PostTags.Remove(postTag);
                await this._context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<List<Post>> GetAllPostsAsync(Expression<Func<Post, bool>> filter)
        {
            try
            {
                return await this._context.Posts
                    .Include(p => p.Image)
                    .Include(p => p.PostTags)
                        .ThenInclude(t => t.Tag)
                    .Include(p => p.User)
                        .ThenInclude(u => u.Image)
                    .Include(p => p.Comments)
                    .Include(p => p.Likes)
                    .Where(filter)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<Post> GetPostAsync(Expression<Func<Post, bool>> filter)
        {
            try
            {
                return await this._context.Posts
                    .Include(p => p.Image)
                    .Include(p => p.PostTags)
                        .ThenInclude(t => t.Tag)
                    .Include(p => p.User)
                        .ThenInclude(u => u.Image)
                    .Include(p => p.Comments)
                    .Include(p => p.Likes)
                    .SingleAsync(filter);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task UpdatePostAsync(Post post)
        {
            try
            {
                Post dbPost = await this._context.Posts.AsNoTracking().Include(p => p.PostTags).SingleAsync(p => p.PostId == post.PostId);

                this._mapper.Map(post, dbPost);

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
