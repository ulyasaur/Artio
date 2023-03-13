using Core.Entitites;

namespace Artio.ViewModels
{
    public class PostViewModel
    {
        public int PostId { get; set; }

        public string ImageUrl { get; set; }

        public string Description { get; set; }

        public DateTimeOffset CreatedAt { get; set; }

        public int CommentCount { get; set; }

        public UserViewModel User { get; set; }

        public List<TagViewModel> Tags { get; set; }

        public List<LikeViewModel> Likes { get; set; }
    }
}
