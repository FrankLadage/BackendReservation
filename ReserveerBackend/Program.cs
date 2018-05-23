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
        private static string port;
        public static void Main(string[] args)
        {
            if (args.Length < 2)
                throw new Exception("No command line argument for running environment or port was given!");
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
            port = args[1];
            Console.WriteLine("Port: " + port);
            const int amountofargs = 2;
            var temp = new string[args.Length - amountofargs];
            Array.Copy(args, amountofargs, temp, 0, args.Length - amountofargs);
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
                .UseUrls(string.Format("http://0.0.0.0:{0}", port))
                .Build();
    }
}
