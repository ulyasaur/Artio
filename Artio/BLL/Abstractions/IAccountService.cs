using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Abstractions
{
    public interface IAccountService
    {
        Task<string> LoginAsync(string username, string password);

        Task<bool> RegistrateAsync(string username, string password);
    }
}
