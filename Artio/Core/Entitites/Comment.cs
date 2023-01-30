using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entitites
{
    public class Comment
    {
        public int CommentId { get; set; }

        public string Body { get; set; }

        public string UserId { get; set; }

        public User User { get; set; }

        public int PostId { get; set; }

        public Post Post { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
