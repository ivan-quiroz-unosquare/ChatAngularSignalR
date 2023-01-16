using AutoMapper;
using ChatAppBackend.Entities;

namespace ChatAppBackend.Utilities
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<MessageDTO, Message>().ReverseMap();
        }
    }
}
