using Core.Entitites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Validation
{
    public class CommentValidator : IValidator<Comment>
    {
        public bool Validate(Comment entity)
        {
            return !string.IsNullOrEmpty(entity.Body)
                && !string.IsNullOrEmpty(entity.UserId)
                && entity.PostId > 0;
        }
    }
}
