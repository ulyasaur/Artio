using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entitites
{
    public class UserTag
    {
        public string UserId { get; set; }

        public User User { get; set; }

        public int TagId { get; set; }

        public Tag Tag { get; set; }
    }
}
