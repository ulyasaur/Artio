namespace Artio.ViewModels
{
    public class PostUpdateViewModel
    {
        public int PostId { get; set; }

        public string Description { get; set; }

        public List<TagViewModel> Tags { get; set; }
    }
}
