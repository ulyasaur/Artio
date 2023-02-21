using Core.Entitites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Dtos
{
    public class PostDto
    {
        public int PostId { get; set; }

        public string ImageUrl { get; set; }

        public string Description { get; set; }

        public DateTimeOffset CreatedAt { get; set; }

        public string UserId { get; set; }

        public List<int> Tags { get; set; }
    }
}
