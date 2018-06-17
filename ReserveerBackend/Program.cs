using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ReserveerBackend.MessagingSystem;

namespace ReserveerBackend
{
    public class Program
    {
        private static string port;
        public static void Main(string[] args)
        {
            string shutdownkey;
            byte[] key = new byte[200];
            var RNG = new Random();
            RNG.NextBytes(key);
            shutdownkey = System.Convert.ToBase64String(key);
            Controllers.ShutdownController.secretkey = shutdownkey;
            StreamWriter i = new StreamWriter("ShutdownKey.txt");
            i.Write(shutdownkey);
            i.Close();

            var config = new ConfigurationBuilder()
                .AddCommandLine(args)
                .AddEnvironmentVariables(prefix: "ASPNETCORE_")
                .Build();
            BuildWebHost(config).Run();
        }

        public static IWebHost BuildWebHost(IConfigurationRoot config) =>
            WebHost.CreateDefaultBuilder()
                .UseConfiguration(config)
                .UseUrls(config.GetValue<string>("server.urls"))
                .UseStartup<Startup>()
                .WithEmailService(new EmailService())
                .Build();
    }
}
