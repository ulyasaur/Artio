using Artio.ViewModels;
using AutoMapper;
using Core.Entitites;

namespace Artio.Mapping
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() 
        {
            CreateMap<Comment, CommentViewModel>();

            CreateMap<Like, LikeViewModel>();

            CreateMap<Post, PostViewModel>()
                .ForMember(d => d.Tags, o => o.MapFrom(s => s.PostTags.Select(x => x.Tag)))
                .ForMember(d => d.CommentCount, o => o.MapFrom(s => s.Comments.Count));

            CreateMap<Post, PostCreateViewModel>();

            CreateMap<Tag, TagViewModel>();

            CreateMap<User, UserProfileViewModel>()
                .ForMember(d => d.Tags, o => o.MapFrom(s => s.UserTags.Select(x => x.Tag)))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
                .ForMember(d => d.FollowingsCount, o => o.MapFrom(s => s.Followings.Count));

            CreateMap<User, UserUpdateViewModel>();

            CreateMap<User, UserViewModel>();

            CreateMap<User, RegisterViewModel>();

            CreateMap<RegisterViewModel, User>();

            CreateMap<CommentCreateModel, Comment>();

            CreateMap<Photo, PhotoViewModel>();
        }
    }
}
