using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entitites
{
    public class UserFollowing
    {
        public string ObserverId { get; set; }

        public User Observer { get; set; }

        public string TargetId { get; set; }

        public User Target { get; set; }
    }
}
