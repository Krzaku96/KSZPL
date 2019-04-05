using AutoMapper;
using KSZPL.Api.Dtos.User;
using KSZPL.Api.Dtos.Visit;
using KSZPL.Data.Models;

namespace KSZPL.Api.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
            CreateMap<Visit, VisitDto>();
            CreateMap<VisitDto, Visit>();
        }
    }
}
