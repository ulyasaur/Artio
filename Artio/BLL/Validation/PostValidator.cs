using Core.Entitites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Validation
{
    public class PostValidator : IValidator<Post>
    {
        public bool Validate(Post entity)
        {
            return !string.IsNullOrEmpty(entity.UserId);
        }
    }
}
