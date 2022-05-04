using Core.Config;
using Core.Mapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WebApi
{
    public static class StartupExtensions
    {
        /// <summary>
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        public static void AddCustomService(this IServiceCollection services, IConfiguration configuration)
        {
            //config dependency injection
            services.DependencyInjectionService(configuration);
            services.DependencyInjectionRepository(configuration);

            //config auto mapper
            services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);
        }

    }
}
