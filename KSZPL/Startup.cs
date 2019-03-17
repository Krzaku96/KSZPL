using System;
using Autofac;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;

namespace KSZPL
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddMvc();
            services.AddAutoMapper();

            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("KSZPL-Core", new Info
                {
                    Version = "1.0",
                    Title = "KSZPL",
                    Description = "KSZPL - Swagger API Documentation"
                });
            });
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            var assemblies = AppDomain.CurrentDomain.GetAssemblies();
            builder.RegisterAssemblyModules(assemblies);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin().AllowCredentials());
            app.UseMvc();
            app.UseSwagger();
            app.UseSwaggerUI(
                options => { options.SwaggerEndpoint("/swagger/KSZPL-Core/swagger.json", "KSZPL Server"); });

            app.UseHttpsRedirection();
        }
    }
}
