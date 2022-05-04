using AutoMapper;
using Core.Repository;
using Core.Service;
using EntityFramework.Entity;
using MyProject.Services.Bussiness.Dto;

namespace Core.Mapper
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UserDto, User>();
            CreateMap<User, UserDto>();

            CreateMap<BookingDetailDto, BookingDetail>();
            CreateMap<BookingDetail, BookingDetailDto>();

            CreateMap<FriendShip, FriendShipDto>();
            CreateMap<FriendShipDto, FriendShip>();

            CreateMap<StoreObject, ObjectDto>();
            CreateMap<ObjectDto, StoreObject>();
            CreateMap<StoreItem, ItemsDto>();
            CreateMap<ItemsDto, StoreItem>();
            CreateMap<StoreOrder, OrderDto>();
            CreateMap<OrderDto, StoreOrder>();
        }
    }
}
