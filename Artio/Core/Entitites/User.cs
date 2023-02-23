using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entitites
{
    public class User : IdentityUser
    {
        public string DisplayName { get; set; }

        public string? ImageUrl { get; set; }

        public string? BackgroundUrl { get; set; }

        public string? Bio { get; set; }

        public List<Post> Posts { get; set; } = new List<Post>();

        public List<Like> Likes { get; set; } = new List<Like>();

        public List<UserTag> UserTags { get; set; } = new List<UserTag>();

        public List<Comment> Comments { get; set; } = new List<Comment>();

        public List<UserFollowing> Followings { get; set; } = new List<UserFollowing>();

        public List<UserFollowing> Followers { get; set; } = new List<UserFollowing>();
    }
}
