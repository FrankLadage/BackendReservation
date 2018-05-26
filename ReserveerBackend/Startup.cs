using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.Swagger;

namespace ReserveerBackend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string connectionString;
            switch (Program.Environment)
            {
                case Program.EnvironmentType.Development:
                    connectionString = Configuration.GetConnectionString("Development");
                    break;
                case Program.EnvironmentType.ProductionTesting:
                    connectionString = Configuration.GetConnectionString("ProductionTesting");
                    break;
                case Program.EnvironmentType.DevelopmentTesting:
                    connectionString = Configuration.GetConnectionString("DevelopmentTesting");
                    break;
                case Program.EnvironmentType.Production:
                    connectionString = Configuration.GetConnectionString("Production");
                    break;
                case Program.EnvironmentType.JenkinsTest:
                    connectionString = Configuration.GetConnectionString("JenkinsTest");
                    break;
                default: throw new NotImplementedException();
            }
            services.AddDbContext<ReserveerDBContext>(options =>
                options.UseNpgsql(connectionString
                    , b => b.MigrationsAssembly("ReserveerBackend")));

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options => {
                    options.LoginPath = "/api/Placeholder/notloggedin";
                    options.AccessDeniedPath = "/api/Placeholder/unauthorized";
                });
            services.AddMvc();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "Reserveer", Version = "v1" });
            });
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });
            services.Configure<MvcOptions>(options =>
            {
                options.Filters.Add(new CorsAuthorizationFilterFactory("AllowAllOrigins"));
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            //see https://docs.microsoft.com/en-us/aspnet/core/fundamentals/static-files?view=aspnetcore-2.0&tabs=aspnetcore2x
            //for information about how to route
            app.UseDefaultFiles();//shows index.html as default page
            app.UseStaticFiles();//enable static files in general

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();
            app.UseCors("AllowAllOrigins");
            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Ordersysteem V1");
            });

            app.UseAuthentication();

            app.UseMvc();





        }
    }
}
