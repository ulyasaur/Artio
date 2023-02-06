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

        private readonly ILogger<TagRepository> _logger;

        public TagService(ITagRepository tagRepository, ILogger<TagRepository> logger)
        {
            _tagRepository = tagRepository;
            _logger = logger;
        }

        public async Task AddTagAsync(Tag tag)
        {
            if (string.IsNullOrEmpty(tag.TagName))
            {
                throw new ArgumentException("Tag is not valid");
            }

            try
            {
                await this._tagRepository.AddTagAsync(tag);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
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
    }
}
