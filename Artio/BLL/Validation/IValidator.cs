using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Validation
{
    public interface IValidator<T>
    {
        bool Validate(T entity);
    }
}
