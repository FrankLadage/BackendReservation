using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ReserveerBackend.Controllers
{
    [Produces("application/json")]
    [Route("api/Ping")]
    public class PingController : Controller
    {
        ReserveerDBContext _context;
        public PingController(ReserveerDBContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Pings the server. Checks if database is connected.
        /// </summary>
        /// <returns>Ok if database is connected.</returns>
        [HttpGet]
        public IActionResult Ping()
        {
            _context.Users.Count();
            return Ok("Pong");
        }
    }
}