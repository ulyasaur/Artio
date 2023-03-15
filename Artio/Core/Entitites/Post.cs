using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entitites
{
    public class Post
    {
        public int PostId { get; set; }

        public Photo Image { get; set; }

        public string? Description { get; set; }

        public DateTimeOffset CreatedAt { get; set; }

        public string UserId { get; set; }

        public User User { get; set; }

        public List<PostTag> PostTags { get; set; } = new List<PostTag>();

        public List<Comment> Comments { get; set; } = new List<Comment>();

        public List<Like> Likes { get; set; } = new List<Like>();

    }
}
