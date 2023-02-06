using Core.Entitites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Validation
{
    public class UserValidator : IValidator<User>
    {
        public bool Validate(User entity)
        {
            return !string.IsNullOrEmpty(entity.UserName)
                && !string.IsNullOrEmpty(entity.DisplayName);
        }
    }
}
