using Artio.Services.Abstractions;
using Artio.ViewModels;
using AutoMapper;
using BLL.Abstractions;
using BLL.Dtos;
using Core.Entitites;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Artio.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;

        private readonly ILikeService _likeService;

        private readonly ILogger<PostController> _logger;

        private readonly IUserAccessor _userAccessor;

        private readonly IMapper _mapper;

        public PostController(
            IPostService postService, 
            ILikeService likeService, 
            ILogger<PostController> logger, 
            IUserAccessor userAccessor, 
            IMapper mapper)
        {
            _postService = postService;
            _likeService = likeService;
            _logger = logger;
            _userAccessor = userAccessor;
            _mapper = mapper;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserPosts(string userId)
        {
            try
            {
                List<Post> posts = await this._postService.GetUserPostsAsync(userId);

                List<PostViewModel> postsViewModel = new List<PostViewModel>();

                this._mapper.Map(posts, postsViewModel);

                return Ok(postsViewModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("tags")]
        public async Task<IActionResult> GetPostsByUserTags()
        {
            try
            {
                string userId = this._userAccessor.GetUserId();

                List<Post> posts = await this._postService.GetPostsByUserTagsAsync(userId);

                List<PostViewModel> postsViewModel = new List<PostViewModel>();

                this._mapper.Map(posts, postsViewModel);

                return Ok(postsViewModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("tags/{tagId}")]
        public async Task<IActionResult> GetPostsByTag(int tagId)
        {
            try
            {
                List<Post> posts = await this._postService.GetPostsByTagAsync(tagId);

                List<PostViewModel> postsViewModel = new List<PostViewModel>();

                this._mapper.Map(posts, postsViewModel);

                return Ok(postsViewModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("followings")]
        public async Task<IActionResult> GetPostsByUserFollowings()
        {
            try
            {
                string userId = this._userAccessor.GetUserId();

                List<Post> posts = await this._postService.GetPostsByUserFollowingsAsync(userId);

                List<PostViewModel> postsViewModel = new List<PostViewModel>();

                this._mapper.Map(posts, postsViewModel);

                return Ok(postsViewModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("post/{postId}")]
        public async Task<IActionResult> GetPost(int postId)
        {
            try
            {
                Post post = await this._postService.GetPostByIdAsync(postId);

                PostViewModel postViewModel = new PostViewModel();

                this._mapper.Map(post, postViewModel);

                return Ok(postViewModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddPost([FromForm]PostCreateViewModel postCreateViewModel)
        {
            try
            {
                PostDto post = new PostDto();

                this._mapper.Map(postCreateViewModel, post);

                post.UserId = this._userAccessor.GetUserId();
                post.CreatedAt = DateTimeOffset.UtcNow;

                Post addedPost = await this._postService.AddPostAsync(post);
                PostViewModel postViewModel= new PostViewModel();
                this._mapper.Map(addedPost, postViewModel);

                return Ok(postViewModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }
        
        [HttpPost("like/{postId}")]
        public async Task<IActionResult> ToggleLike(int postId)
        {
            try
            {
                string userId = this._userAccessor.GetUserId();
                await this._likeService.ToggleLike(userId, postId);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{postId}")]
        public async Task<IActionResult> EditPost(int postId, PostUpdateViewModel postUpdateViewModel)
        {
            try
            {
                PostDto post = new PostDto();

                this._mapper.Map(postUpdateViewModel, post);
                post.PostId = postId;

                await this._postService.UpdatePostAsync(post);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{postId}")]
        public async Task<IActionResult> DeletePost(int postId)
        {
            try
            {
                await this._postService.DeletePostAsync(postId);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }
    }
}
