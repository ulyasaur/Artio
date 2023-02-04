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
    public interface IPostRepository
    {
        Task<List<Post>> GetAllPostsAsync(Expression<Func<Post, bool>> filter);

        Task<Post> GetPostAsync(Expression<Func<Post, bool>> filter);

        Task AddPostAsync(Post post);

        Task UpdatePostAsync(Post post);

        Task DeletePostAsync(int postId);

        Task AddTagToPostAsync(int postId, int tagId);

        Task DeleteTagFromPostAsync(int postId, int tagId);
    }
}
