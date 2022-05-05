using AutoMapper;
using Core.Repository;
using Core.Service;
using EntityFramework.Entity;

namespace Core.Mapper
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UserDto, User>();
            CreateMap<User, UserDto>();
        }
    }
}
