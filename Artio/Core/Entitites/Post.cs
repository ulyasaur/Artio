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

        public string ImageUrl { get; set; }

        public string Description { get; set; }

        public DateTime CreatedAt { get; set; }

        public string UserId { get; set; }

        public User User { get; set; }

        public List<PostTag> PostTags { get; set; }

        public List<Comment> Comments { get; set; }

        public List<Like> Likes { get; set; }

    }
}
