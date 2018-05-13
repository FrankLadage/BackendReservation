using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ReserveerBackend.Controllers
{
    [Produces("application/json")]
    [Route("api/Shutdown")]
    public class ShutdownController : Controller
    {
        [HttpPost]
        public void Shutdown(string key)
        {
            if (secretkey == key)
                Environment.Exit(0);
        }

        public static string secretkey { get; set; }
    }
}