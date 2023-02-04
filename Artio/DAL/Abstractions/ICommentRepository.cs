using Core.Entitites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Abstractions
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAllComments(Expression<Func<Comment, bool>> filter);

        Task AddComment(Comment comment);

        Task DeleteComment(int commentId);
    }
}
