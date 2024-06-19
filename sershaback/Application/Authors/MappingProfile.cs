using Application.Authors;
using Application.Avatar;
using AutoMapper;
using Domain;

namespace Application.Posts
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Post, PostDto>();
            CreateMap<Author, AuthorDto>();
            //CreateMap<AppUser, Application.User.User>();

            CreateMap<AppUser, Application.User.User>()
                .ForMember(d => d.AvatarImage, o => o.MapFrom(s => s.AvatarImage))
                .ForMember(d => d.Stage, o => o.MapFrom(s => s.Stage));

            CreateMap<AvatarImage, AvatarImageDTO>();
        }
    }
}
