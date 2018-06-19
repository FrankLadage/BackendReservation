using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ReserveerBackend.Controllers
{
    /// <summary>
    /// Allows for remote shutdown of the server, if using the correct key generated at startup of the server.
    /// Used by jenkins to shut down servers running on an assigner port.
    /// </summary>
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

        [HttpPost]
        [Route("AdminShutdown")]
        [Authorize(Roles = Authorization.AdminOrHigher)]
        public void Shutdown()
        {
            Environment.Exit(0);
        }

        public static string secretkey { get; set; }
    }
}