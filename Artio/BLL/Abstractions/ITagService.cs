using Core.Entitites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Abstractions
{
    public interface ITagService
    {
        Task<List<Tag>> GetAllTagsAsync();

        Task<List<Tag>> GetTagsBySearchAsync(string search);
        
        Task<Tag> GetTagByIdAsync(int tagId);
        
        Task<List<Tag>> GetUserTagsAsync(string userId);

        Task<Tag> AddTagAsync(Tag tag);
    }
}
