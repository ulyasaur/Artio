namespace Artio.ViewModels
{
    public class PostCreateViewModel
    {
        public IFormFile Image { get; set; }

        public string? Description { get; set; }

        public List<TagViewModel> Tags { get; set; }
    }
}
