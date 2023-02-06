using Core.Entitites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Abstractions
{
    public interface ILikeService
    {
        Task<List<Like>> GetLikesForPost(int postId);

        Task ToggleLike(string userId, int postId);
    }
}
