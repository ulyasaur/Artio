using Artio.Services.Abstractions;
using Artio.ViewModels;
using AutoMapper;
using BLL.Abstractions;
using Core.Entitites;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace Artio.SignalR
{
    public class ChatHub : Hub
    {
        private readonly ICommentService _commentService;

        private readonly IUserAccessor _userAccessor;

        private readonly IMapper _mapper;

        public ChatHub(ICommentService commentService, IUserAccessor userAccessor, IMapper mapper)
        {
            _commentService = commentService;
            _userAccessor = userAccessor;
            _mapper = mapper;
        }

        public async Task SendComment(CommentCreateModel commentCreateModel)
        {
            Comment comment = new Comment();
            this._mapper.Map(commentCreateModel, comment);
            comment.UserId = this._userAccessor.GetUserId();

            var addedComment = await this._commentService.AddComment(comment);

            CommentViewModel viewModel = new CommentViewModel();
            this._mapper.Map(addedComment, viewModel);

            await Clients.Group(comment.PostId.ToString())
                .SendAsync("ReceiveComment", viewModel);
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var postId = httpContext.Request.Query["postId"];

            await Groups.AddToGroupAsync(Context.ConnectionId, postId);

            var comments = await this._commentService.GetCommentsForPost(int.Parse(postId));

            List<CommentViewModel> commentViewModels = new List<CommentViewModel>();
            this._mapper.Map(comments, commentViewModels);

            await Clients.Caller.SendAsync("LoadComments", commentViewModels);
        }
    }
}
