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
               /* .ForMember(d => d.User, o => o.MapFrom(s => 
                    new UserViewModel() 
                    { 
                        DisplayName = s.User.DisplayName,
                        ImageUrl = s.User.ImageUrl,
                        UserId = s.User.Id,
                    }));*/

            CreateMap<Like, LikeViewModel>();
                /*.ForMember(d => d.User, o => o.MapFrom(s =>
                    new UserViewModel()
                    {
                        DisplayName = s.User.DisplayName,
                        ImageUrl = s.User.ImageUrl,
                        UserId = s.User.Id,
                    }));*/

            CreateMap<Post, PostViewModel>()
                .ForMember(d => d.LikesCount, o => o.MapFrom(s => s.Likes.Count));
                /*.ForMember(d => d.User, o => o.MapFrom(s =>
                    new UserViewModel()
                    {
                        DisplayName = s.User.DisplayName,
                        ImageUrl = s.User.ImageUrl,
                        UserId = s.User.Id,
                    }));*/

            CreateMap<Post, PostCreateViewModel>();

            CreateMap<Tag, TagViewModel>();

            CreateMap<User, UserProfileViewModel>()
                .ForMember(d => d.Tags, o => o.MapFrom(s => s.UserTags.Select(x => x.Tag)))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
                .ForMember(d => d.FollowingsCount, o => o.MapFrom(s => s.Followings.Count));

            CreateMap<User, UserUpdateViewModel>();

            CreateMap<User, UserViewModel>();

            CreateMap<User, RegisterViewModel>();
        }
    }
}
