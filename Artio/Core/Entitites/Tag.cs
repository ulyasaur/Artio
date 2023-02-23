using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entitites
{
    public class Tag
    {
        public int TagId { get; set; }

        public string TagName { get; set; }

        public List<UserTag> UserTags { get; set; } = new List<UserTag>();

        public List<PostTag> PostTags { get; set; } = new List<PostTag>();
    }
}
