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
    public interface ITagRepository
    {
        Task<List<Tag>> GetAllTagsAsync(Expression<Func<Tag, bool>> filter);

        Task<Tag> GetTagAsync(Expression<Func<Tag, bool>> filter);

        Task AddTagAsync(Tag tag);
    }
}
