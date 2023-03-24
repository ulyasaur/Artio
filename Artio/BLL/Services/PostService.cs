using AutoMapper;
using BLL.Abstractions;
using BLL.Dtos;
using BLL.Validation;
using Core.Entitites;
using DAL.Abstractions;
using DAL.Photos.Abstractions;
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

        private readonly IPhotoAccessor _photoAccessor;

        private readonly IMapper _mapper;

        private readonly IValidator<Post> _validator;

        private readonly ILogger<PostService> _logger;

        public PostService(
            IPostRepository postRepository, 
            IUserRepository userRepository, 
            ITagRepository tagRepository, 
            IPhotoAccessor photoAccessor, 
            IMapper mapper, 
            ILogger<PostService> logger)
        {
            _postRepository = postRepository;
            _userRepository = userRepository;
            _tagRepository = tagRepository;
            _photoAccessor = photoAccessor;
            _mapper = mapper;
            _logger = logger;

            _validator = new PostValidator();
        }

        public async Task<Post> AddPostAsync(PostDto postDto)
        {
            Post post = new Post();
            post.UserId = postDto.UserId;
            post.CreatedAt = postDto.CreatedAt;
            post.Description = postDto.Description;

            if (!this._validator.Validate(post))
            {
                throw new ArgumentException("Post is not valid");
            }

            try
            {
                post.Image = await this._photoAccessor.AddPhoto(postDto.Image);

                foreach (var tag in postDto.Tags)
                {
                    Tag existingTag = await this._tagRepository.GetTagAsync(x => x.TagId == tag.TagId);

                    post.PostTags.Add(new PostTag { TagId = tag.TagId });
                }

                await this._postRepository.AddPostAsync(post);

                Post addedPost = await this._postRepository.GetPostAsync(p => p.Image.Id == post.Image.Id);
                return addedPost;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);                
            }
            return null;
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

                posts = (await this._postRepository.GetAllPostsAsync(p => followings.Contains(p.UserId))).OrderByDescending(p => p.CreatedAt).ToList();
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

                //posts = await this._postRepository.GetAllPostsAsync(p => tags.Any(t => p.PostTags.Any(pt => pt.TagId == t)));
                posts = (await this._postRepository.GetAllPostsAsync(p => p.PostTags.Any(pt => tags.Contains(pt.TagId)))).OrderByDescending(p => p.CreatedAt).ToList();
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

                posts = (await this._postRepository.GetAllPostsAsync(x => x.User.Id.Equals(userId))).OrderByDescending(p => p.CreatedAt).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            return posts;
        }

        public async Task UpdatePostAsync(PostDto postDto)
        {
            if (postDto.PostId <= 0)
            {
                throw new ArgumentNullException("Post id must be greater than 0");
            }

            try
            {
                var tags = await this._tagRepository.GetAllTagsAsync(t => postDto.Tags.Select(t => t.TagId).Contains(t.TagId));

                Post existingPost = await this._postRepository.GetPostAsync(x => x.PostId == postDto.PostId);
                existingPost.Description = postDto.Description;
                existingPost.PostTags = tags.Select(t => new PostTag { PostId = postDto.PostId, TagId = t.TagId }).ToList();                

                await this._postRepository.UpdatePostAsync(existingPost);                
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }
    }
}
