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
    public class TagRepository : ITagRepository
    {
        private readonly ApplicationContext _context;

        private readonly ILogger<TagRepository> _logger;

        public TagRepository(ApplicationContext context, ILogger<TagRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task AddTagAsync(Tag tag)
        {
            try
            {
                this._context.Tags.Add(tag);
                await this._context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<List<Tag>> GetAllTagsAsync(Expression<Func<Tag, bool>> filter)
        {
            try
            {
                return await this._context.Tags.Where(filter).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<Tag> GetTagAsync(Expression<Func<Tag, bool>> filter)
        {
            try
            {
                return await this._context.Tags.SingleAsync(filter);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }
    }
}
