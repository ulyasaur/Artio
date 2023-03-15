namespace Artio.ViewModels
{
    public class PostCreateViewModel
    {
        public PhotoViewModel Image { get; set; }

        public string Description { get; set; }

        public List<int> Tags { get; set; }
    }
}
