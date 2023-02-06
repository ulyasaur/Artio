using BLL.Abstractions;
using Core.Entitites;
using DAL.Abstractions;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class LikeService : ILikeService
    {
        private readonly ILikeRepository _likeRepository;

        private readonly IPostRepository _postRepository;

        private readonly IUserRepository _userRepository;

        private readonly ILogger<LikeService> _logger;

        public LikeService(ILikeRepository likeRepository, IPostRepository postRepository, 
            IUserRepository userRepository, ILogger<LikeService> logger)
        {
            _likeRepository = likeRepository;
            _postRepository = postRepository;
            _userRepository = userRepository;
            _logger = logger;
        }

        public async Task<List<Like>> GetLikesForPost(int postId)
        {
            if (postId <= 0)
            {
                throw new ArgumentNullException("Post id must be greater than 0");
            }

            List<Like> likes = new List<Like>();

            try
            {
                Post post = await this._postRepository.GetPostAsync(x => x.PostId == postId);

                likes = await this._likeRepository.GetAllLikes(x => x.PostId == postId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            return likes;
        }

        public async Task ToggleLike(string userId, int postId)
        {
            if (postId <= 0)
            {
                throw new ArgumentNullException("Post id must be greater than 0");
            }

            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentNullException("User id must not be empty");
            }

            try
            {
                User user = await this._userRepository.GetUserAsync(x => x.Id.Equals(userId));

                Post post = await this._postRepository.GetPostAsync(x => x.PostId == postId); 

                Like existingLike = await this._likeRepository.GetLike(x => x.UserId.Equals(userId) && x.PostId == postId);

                if (existingLike is null)
                {

                    Like like = new Like() 
                    { 
                        UserId = userId, 
                        PostId = postId 
                    };

                    await this._likeRepository.AddLike(like);
                }
                else
                {
                    await this._likeRepository.DeleteLike(userId, postId);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }
    }
}
