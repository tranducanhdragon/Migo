
using Core.Repository;
using Core.Service;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NetCore.AutoRegisterDi;
using Microsoft.AspNetCore.Identity;
using EntityFramework.Entity;
using EntityFramework.Context;
using Core.Base;

namespace Core.Config
{
    public static class InjectionExtension
    {
        public static void DependencyInjectionService(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ICommunityService, CommunityService>();
            services.AddScoped<ICitizenService, CitizenService>();
            services.AddScoped<ITourService, TourService>();

            services.AddScoped<IBusinessGridViewAppRateService, BusinessGridViewAppRateService>();
            services.AddScoped<IBusinessItemAppService, BusinessItemAppService>();
            services.AddScoped<IBusinessObjectAppService, BusinessObjectAppService>();
            services.AddScoped<ISellerBusinessAppService, SellerBusinessAppService>();
            services.AddScoped<IBuyerBusinessAppService, BuyerBusinessAppService>();
        }
        public static void DependencyInjectionRepository(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();

            services.AddScoped<ICommunityRepository, CommunityRepository>();
            services.AddScoped<IBookingDetailRepository, BookingDetailRepository>();

            services.AddScoped<ICitizenRepository, CitizenRepository>();
            services.AddScoped<IFriendshipRepository, FriendshipRepository>();


            services.AddScoped<IStoreObjectRepository, StoreObjectRepository>();
            services.AddScoped<IStoreItemRepository, StoreItemRepository>();
            services.AddScoped<IStoreOrderRepository, StoreOrderRepository>();

            services.AddScoped<ITourRepository, TourRepository>();

        }
    }
}
