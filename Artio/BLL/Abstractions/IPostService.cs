using BLL.Dtos;
using Core.Entitites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Abstractions
{
    public interface IPostService
    {
        Task<List<Post>> GetUserPostsAsync(string userId);

        Task<List<Post>> GetPostsByUserTagsAsync(string userId);

        Task<List<Post>> GetPostsByUserFollowingsAsync(string userId);

        Task<Post> GetPostByIdAsync(int postId);

        Task AddPostAsync(PostDto postDto);

        Task UpdatePostAsync(PostDto postDto);

        Task DeletePostAsync(int postId);

        Task AddTagToPostAsync(int postId, int tagId);

        Task DeleteTagFromPostAsync(int postId, int tagId);
    }
}
