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
        public enum EnvironmentType
        {
            Production,
            Testing,
            Development
        }
        public static EnvironmentType Environment { private set; get; }
        public static void Main(string[] args)
        {
            if (args.Length < 1)
                throw new Exception("No command line argument for running environment given!");
            switch (args[0])
            {
                case "Development":
                    Environment = EnvironmentType.Development;
                    break;
                case "Testing":
                    Environment = EnvironmentType.Testing;
                    break;
                case "Production":
                    Environment = EnvironmentType.Production;
                    break;
                default:
                    throw new Exception("Given environment is not valid! Please enter either 'Development', 'Testing' or 'Production'");
            }
            var temp = new string[args.Length - 1];
            Array.Copy(args, 1, temp, 0, args.Length - 1);
            args = temp;

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
                .UseUrls("http://0.0.0.0:5000")
                .Build();
    }
}
