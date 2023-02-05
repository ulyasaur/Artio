using Core.Entitites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Abstractions
{
    public interface ITokenService
    {
        string GenerateToken(User user, List<string> roles);
    }
}
