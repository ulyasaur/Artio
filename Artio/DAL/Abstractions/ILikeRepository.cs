using Core.Entitites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace DAL.Abstractions
{
    public interface ILikeRepository
    {
        Task<List<Like>> GetAllLikes(Expression<Func<Like, bool>> filter);

        Task<Like> GetLike(Expression<Func<Like, bool>> filter);

        Task AddLike(Like like);

        Task DeleteLike(string userId, int postId);
    }
}
