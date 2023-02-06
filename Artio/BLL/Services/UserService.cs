﻿using BLL.Abstractions;
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
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        private readonly ITagRepository _tagRepository;

        private readonly IValidator<User> _validator;

        private readonly ILogger<UserService> _logger;

        public UserService(IUserRepository userRepository, ITagRepository tagRepository, ILogger<UserService> logger)
        {
            _userRepository = userRepository;
            _tagRepository = tagRepository;
            _logger = logger;

            _validator = new UserValidator();
        }

        public async Task AddTagToUserAsync(string userId, int tagId)
        {
            if (!string.IsNullOrEmpty(userId))
            {
                throw new ArgumentNullException("User id must not be null");
            }

            if(tagId <= 0)
            {
                throw new ArgumentNullException("Tag id must be greater than 0");
            }

            try
            {
                User user = await this._userRepository.GetUserAsync(x => x.Id.Equals(userId));

                Tag tag = await this._tagRepository.GetTagAsync(x => x.TagId == tagId);

                await this._userRepository.AddTagToUserAsync(userId, tagId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }

        public async Task DeleteTagFromUserAsync(string userId, int tagId)
        {
            if (!string.IsNullOrEmpty(userId))
            {
                throw new ArgumentNullException("User id must not be null");
            }

            if (tagId <= 0)
            {
                throw new ArgumentNullException("Tag id must be greater than 0");
            }

            try
            {
                User user = await this._userRepository.GetUserAsync(x => x.Id.Equals(userId));

                Tag tag = await this._tagRepository.GetTagAsync(x => x.TagId == tagId);

                await this._userRepository.DeleteTagFromUserAsync(userId, tagId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }

        public async Task DeleteUserAsync(string userId)
        {
            if (!string.IsNullOrEmpty(userId))
            {
                throw new ArgumentNullException("User id must not be null");
            }

            try
            {
                User user = await this._userRepository.GetUserAsync(x => x.Id.Equals(userId));

                await this._userRepository.DeleteUserAsync(userId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }

        public async Task<List<User>> GetFollowersAsync(string targetId)
        {
            if (!string.IsNullOrEmpty(targetId))
            {
                throw new ArgumentNullException("Target id must not be null");
            }

            List<User> followers = new List<User>();

            try
            {
                User user = await this._userRepository.GetUserAsync(x => x.Id.Equals(targetId));

                followers = await this._userRepository.GetFollowersAsync(targetId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            return followers;
        }

        public async Task<List<User>> GetFollowingsAsync(string observerId)
        {
            if (!string.IsNullOrEmpty(observerId))
            {
                throw new ArgumentNullException("Observer id must not be null");
            }

            List<User> followings = new List<User>();

            try
            {
                User user = await this._userRepository.GetUserAsync(x => x.Id.Equals(observerId));

                followings = await this._userRepository.GetFollowingsAsync(observerId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            return followings;
        }

        public async Task<User> GetUserByIdAsync(string userId)
        {
            if (!string.IsNullOrEmpty(userId))
            {
                throw new ArgumentNullException("User id must not be null");
            }

            User user = null;

            try
            {
                user = await this._userRepository.GetUserAsync(x => userId.Equals(x.Id));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            return user;
        }

        public async Task ToggleFollowAsync(string observerId, string targetId)
        {
            if (!string.IsNullOrEmpty(targetId))
            {
                throw new ArgumentNullException("Target id must not be null");
            }

            if (!string.IsNullOrEmpty(observerId))
            {
                throw new ArgumentNullException("Observer id must not be null");
            }

            try
            {
                User observer = await this._userRepository.GetUserAsync(x => observerId.Equals(x.Id));

                User target = await this._userRepository.GetUserAsync(x => targetId.Equals(x.Id));

                UserFollowing userFollowing = await this._userRepository.GetUserFollowing(observerId, targetId);

                if (userFollowing is null)
                {
                    await this._userRepository.AddUserFollowingAsync(observerId, targetId);
                }
                else
                {
                    await this._userRepository.DeleteUserFollowingAsync(observerId, targetId);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }

        public async Task UpdateUserAsync(User user)
        {
            if (!string.IsNullOrEmpty(user.Id))
            {
                throw new ArgumentNullException("User id must not be null");
            }

            if (this._validator.Validate(user))
            {
                throw new ArgumentException("User is not valid");
            }

            try
            {
                User existingUser = await this._userRepository.GetUserAsync(x => x.Id.Equals(user.Id));

                await this._userRepository.UpdateUserAsync(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }
    }
}
