using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace ReserveerBackend
{
    public class Program
    {
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
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();
    }
}
