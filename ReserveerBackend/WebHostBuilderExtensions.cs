using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using ReserveerBackend.MessagingSystem;
using System;
using System.Collections.Generic;
//using System.Linq;
using System.Threading.Tasks;

namespace ReserveerBackend
{
    public static class WebHostBuilderExtensions
    {
        /// <summary>
        /// Adds an IEmailService to the services of the webhostbuilder
        /// </summary>
        /// <param name="hostbuilder"></param>
        /// <param name="emailservice"></param>
        /// <returns></returns>
        public static IWebHostBuilder WithEmailService(this IWebHostBuilder hostbuilder, IEmailService emailservice)
        {
            return hostbuilder.ConfigureServices(x => x.Add(new ServiceDescriptor(typeof(IEmailService), emailservice)));
        }
    }
}
