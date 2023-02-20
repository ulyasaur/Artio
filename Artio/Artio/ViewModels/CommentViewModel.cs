using Core.Entitites;

namespace Artio.ViewModels
{
    public class CommentViewModel
    {
        public int CommentId { get; set; }

        public string Body { get; set; }

        public UserViewModel User { get; set; }

        public DateTimeOffset CreatedAt { get; set; }
    }
}
