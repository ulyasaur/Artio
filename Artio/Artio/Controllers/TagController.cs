using Artio.ViewModels;
using AutoMapper;
using BLL.Abstractions;
using Core.Entitites;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Artio.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagService _tagService;

        private readonly ILogger<TagController> _logger;

        private readonly IMapper _mapper;

        public TagController(ITagService tagService, ILogger<TagController> logger, IMapper mapper)
        {
            _tagService = tagService;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTags() 
        {
            try
            {
                List<Tag> tags = await this._tagService.GetAllTagsAsync();

                List<TagViewModel> tagsViewModels = new List<TagViewModel>();
                this._mapper.Map(tags, tagsViewModels);

                return Ok(tagsViewModels);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{tagId}")]
        public async Task<IActionResult> GetTagById(int tagId) 
        {
            try
            {
                Tag tag = await this._tagService.GetTagByIdAsync(tagId);

                TagViewModel tagsViewModel = new TagViewModel();
                this._mapper.Map(tag, tagsViewModel);

                return Ok(tagsViewModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("followed/{userId}")]
        public async Task<IActionResult> GetAllTags(string userId) 
        {
            try
            {
                List<Tag> tags = await this._tagService.GetUserTagsAsync(userId);

                List<TagViewModel> tagsViewModels = new List<TagViewModel>();
                this._mapper.Map(tags, tagsViewModels);

                return Ok(tagsViewModels);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddTag(TagCreateViewModel tagCreateViewModel)
        {
            try
            {
                Tag tag = await this._tagService.AddTagAsync(new Tag { TagName = tagCreateViewModel.TagName });

                TagViewModel tagViewModel = new TagViewModel();
                this._mapper.Map(tag, tagViewModel);

                return Ok(tagViewModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }
    }
}
