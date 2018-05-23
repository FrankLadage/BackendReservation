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
        [HttpGet]
        public IActionResult Ping()
        {
            return Ok("Pong");
        }
    }
}