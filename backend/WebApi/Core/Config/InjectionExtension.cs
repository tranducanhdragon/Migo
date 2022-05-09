
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
            services.AddScoped<ITourService, TourService>();
            services.AddScoped<IEmailService, EmailService>();
        }
        public static void DependencyInjectionRepository(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<ITourRepository, TourRepository>();

        }
    }
}
