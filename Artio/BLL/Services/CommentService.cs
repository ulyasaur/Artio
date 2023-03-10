using BLL.Abstractions;
using BLL.Validation;
using Core.Entitites;
using DAL.Abstractions;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;

        private readonly IUserRepository _userRepository;

        private readonly IValidator<Comment> _validator;

        private readonly ILogger<CommentService> _logger;

        public CommentService(ICommentRepository commentRepository, IUserRepository userRepository, ILogger<CommentService> logger)
        {
            _commentRepository = commentRepository;
            _userRepository = userRepository;
            _logger = logger;

            _validator = new CommentValidator();
        }

        public async Task<Comment> AddComment(Comment comment)
        {
            if (!this._validator.Validate(comment))
            {
                throw new ArgumentException("Comment is not valid");
            }

            try
            {
                User user = await this._userRepository.GetUserAsync(x => x.Id.Equals(comment.UserId));
                comment.User = user;

                await this._commentRepository.AddComment(comment);

                return comment;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task DeleteComment(int commentId)
        {
            if (commentId <= 0)
            {
                throw new ArgumentNullException("Comment id must be greater than 0");
            }

            try
            {
                Comment comment = await this._commentRepository.GetComment(x => x.CommentId == commentId);

                await this._commentRepository.DeleteComment(commentId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }

        public async Task<List<Comment>> GetCommentsForPost(int postId)
        {
            List<Comment> comments = new List<Comment>();

            try
            {
                 comments = await this._commentRepository.GetAllComments(x => x.PostId == postId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            
            return comments;
        }
    }
}
