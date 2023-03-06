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

                return Problem(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddTag(string tagName)
        {
            try
            {
                await this._tagService.AddTagAsync(new Tag { TagName = tagName });

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return Problem(ex.Message);
            }
        }
    }
}
