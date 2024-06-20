using System.Linq;
using Application.Authors;
using Application.Avatar;
using Application.Sersha;
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

            CreateMap<SershaItem, SershaItemDTO>();
            CreateMap<AppUser, Domain.AppUser>()
                .ForMember(d => d.OwnedSershaItems, o => o.MapFrom(s => s.OwnedSershaItems.Select(oi => oi.SershaItem)))
                .ForMember(d => d.SelectedSershaItems, o => o.MapFrom(s => s.SelectedSershaItems.Select(si => si.SershaItem)));
        }
    }
}
