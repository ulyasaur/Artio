﻿using Artio.ViewModels;
using AutoMapper;
using BLL.Dtos;
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

            CreateMap<PostCreateViewModel, PostDto>();

            CreateMap<PostUpdateViewModel, PostDto>();

            CreateMap<Tag, TagViewModel>();

            CreateMap<TagViewModel, Tag>();

            CreateMap<User, UserProfileViewModel>()
                .ForMember(d => d.Tags, o => o.MapFrom(s => s.UserTags.Select(x => x.Tag)))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
                .ForMember(d => d.FollowingsCount, o => o.MapFrom(s => s.Followings.Count));

            CreateMap<UserUpdateViewModel, User>();

            CreateMap<User, UserViewModel>();

            CreateMap<User, RegisterViewModel>();

            CreateMap<RegisterViewModel, User>();

            CreateMap<CommentCreateModel, Comment>();

            CreateMap<Photo, PhotoViewModel>();
        }
    }
}
