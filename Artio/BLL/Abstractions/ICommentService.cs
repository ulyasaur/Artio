using Core.Entitites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Abstractions
{
    public interface ICommentService
    {
        Task<List<Comment>> GetCommentsForPost(int postId);

        Task<Comment> AddComment(Comment comment);

        Task DeleteComment(int commentId);
    }
}
