using Application.Authors;
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
            CreateMap<AppUser, Application.User.User>();
        }
    }
}
