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

        public string Bio { get; set; }

        public List<Post> Posts { get; set; }

        public List<Like> Likes { get; set; }

        public List<UserTag> UserTags { get; set; }

        public List<Comment> Comments { get; set; }

        public List<UserFollowing> Followings { get; set; }

        public List<UserFollowing> Followers { get; set; }
    }
}
