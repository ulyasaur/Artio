using BLL.Abstractions;
using BLL.Validation;
using Core.Entitites;
using DAL.Abstractions;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class PostService : IPostService
    {
        private readonly IPostRepository _postRepository;

        private readonly IUserRepository _userRepository;

        private readonly ITagRepository _tagRepository;

        private readonly IValidator<Post> _validator;

        private readonly ILogger<PostService> _logger;

        public PostService(IPostRepository postRepository, IUserRepository userRepository, 
            ITagRepository tagRepository, ILogger<PostService> logger)
        {
            _postRepository = postRepository;
            _userRepository = userRepository;
            _tagRepository = tagRepository;
            _logger = logger;

            _validator = new PostValidator();
        }

        public async Task AddPostAsync(Post post)
        {
            if (!this._validator.Validate(post))
            {
                throw new ArgumentException("Post is not valid");
            }

            try
            {
                await this._postRepository.AddPostAsync(post);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }

        public async Task AddTagToPostAsync(int postId, int tagId)
        {
            if (postId <= 0)
            {
                throw new ArgumentNullException("Post id must be greater than 0");
            }

            if (tagId <= 0)
            {
                throw new ArgumentNullException("Tag id must be greater than 0");
            }

            try
            {
                Post post = await this._postRepository.GetPostAsync(x => x.PostId == postId);

                Tag tag = await this._tagRepository.GetTagAsync(x => x.TagId == tagId);

                await this._postRepository.AddTagToPostAsync(postId, tagId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }

        public async Task DeletePostAsync(int postId)
        {
            if (postId <= 0)
            {
                throw new ArgumentNullException("Post id must be greater than 0");
            }

            try
            {
                Post post = await this._postRepository.GetPostAsync(x => x.PostId == postId);

                await this._postRepository.DeletePostAsync(postId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }

        public async Task DeleteTagFromPostAsync(int postId, int tagId)
        {
            if (postId <= 0)
            {
                throw new ArgumentNullException("Post id must be greater than 0");
            }

            if (tagId <= 0)
            {
                throw new ArgumentNullException("Tag id must be greater than 0");
            }

            try
            {
                Post post = await this._postRepository.GetPostAsync(x => x.PostId == postId);

                Tag tag = await this._tagRepository.GetTagAsync(x => x.TagId == tagId);

                await this._postRepository.DeleteTagFromPostAsync(postId, tagId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }

        public async Task<Post> GetPostByIdAsync(int postId)
        {
            if (postId <= 0)
            {
                throw new ArgumentNullException("Post id must be greater than 0");
            }

            Post post = null;

            try
            {
                post = await this._postRepository.GetPostAsync(x => x.PostId == postId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            return post;
        }

        public async Task<List<Post>> GetPostsByUserFollowingsAsync(string userId)
        {

            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentNullException("User id must not be empty");
            }

            List<Post> posts = new List<Post>();

            try
            {
                User user = await this._userRepository.GetUserAsync(x => x.Id.Equals(userId));

                var followings = user.Followings.Select(x => x.TargetId);

                posts = await this._postRepository.GetAllPostsAsync(p => followings.Contains(p.UserId));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            return posts;
        }

        public async Task<List<Post>> GetPostsByUserTagsAsync(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentNullException("User id must not be empty");
            }

            List<Post> posts = new List<Post>();

            try
            {
                User user = await this._userRepository.GetUserAsync(x => x.Id.Equals(userId));

                var tags = user.UserTags.Select(t => t.TagId);

                posts = await this._postRepository.GetAllPostsAsync(p => tags.Any(t => p.PostTags.Any(pt => pt.TagId == t)));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            return posts;
        }

        public async Task<List<Post>> GetUserPostsAsync(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentNullException("User id must not be empty");
            }

            List<Post> posts = new List<Post>();

            try
            {
                User user = await this._userRepository.GetUserAsync(x => x.Id.Equals(userId));

                posts = await this._postRepository.GetAllPostsAsync(x => x.User.Id.Equals(userId));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            return posts;
        }

        public async Task UpdatePostAsync(Post post)
        {
            if (post.PostId <= 0)
            {
                throw new ArgumentNullException("Post id must be greater than 0");
            }

            if (!this._validator.Validate(post))
            {
                throw new ArgumentException("Post is not valid");
            }

            try
            {
                Post existingPost = await this._postRepository.GetPostAsync(x => x.PostId == post.PostId);

                await this._postRepository.UpdatePostAsync(post);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }
    }
}
