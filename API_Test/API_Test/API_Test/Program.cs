using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;

namespace API_Test
{
    class Program
    {
        static int Main(string[] args)
        {
            if (args.Length < 1)
                throw new Exception("No argument for the webaddress is given");
            string address = args[0];
            return 1;
        }
    }
}
