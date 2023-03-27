using BLL.Abstractions;
using Core.Entitites;
using DAL.Abstractions;
using DAL.Repositories.ef;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class TagService : ITagService
    {
        private readonly ITagRepository _tagRepository;

        private readonly IUserRepository _userRepository;

        private readonly ILogger<TagRepository> _logger;

        public TagService(ITagRepository tagRepository, IUserRepository userRepository, ILogger<TagRepository> logger)
        {
            _tagRepository = tagRepository;
            _userRepository = userRepository;
            _logger = logger;
        }

        public async Task<Tag> AddTagAsync(Tag tag)
        {
            if (string.IsNullOrEmpty(tag.TagName))
            {
                throw new ArgumentException("Tag is not valid");
            }

            try
            {
                await this._tagRepository.AddTagAsync(tag);

                Tag addedTag = await this._tagRepository.GetTagAsync(t => t.TagName.Equals(tag.TagName));

                return addedTag;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task<List<Tag>> GetAllTagsAsync()
        {
            List<Tag> tags = new List<Tag>();

            try
            {
                tags =  await this._tagRepository.GetAllTagsAsync(x => x.TagId > 0);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            return tags;
        }
        public async Task<Tag> GetTagByIdAsync(int tagId)
        {
            if (tagId < 0)
            {
                throw new ArgumentException("Tag id must be greater than 0");
            }

            try
            {
                Tag tag =  await this._tagRepository.GetTagAsync(x => x.TagId == tagId);
                return tag;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);  
                return null;              
            }
            
        }

        public async Task<List<Tag>> GetTagsBySearchAsync(string search)
        {
            List<Tag> tags = new List<Tag>();

            try
            {
                tags = await this._tagRepository.GetAllTagsAsync(t => t.TagName.ToLower().StartsWith(search.ToLower()));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            return tags;
        }

        public async Task<List<Tag>> GetUserTagsAsync(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentException("User id is not valid");
            }

            List<Tag> tags = new List<Tag>();

            try
            {
                var tagIds = (await this._userRepository.GetUserAsync(u => u.Id.Equals(userId))).UserTags.Select(ut => ut.TagId).ToList();

                tags =  await this._tagRepository.GetAllTagsAsync(x => tagIds.Contains(x.TagId));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            return tags;
        }
    }
}
