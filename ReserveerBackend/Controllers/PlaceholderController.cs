using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ReserveerBackend.Controllers
{
    /// <summary>
    /// Placeholder for redirections, so that not logged in and unauthorized responses do not return 404
    /// </summary>
    [Produces("application/json")]
    [Route("api/Placeholder")]
    public class PlaceholderController : Controller
    {
        [HttpGet]
        [Route("unauthorized")]
        public string Not_authorized()
        {
            Response.StatusCode = 401;
            return "You are not authorized to do that";
        }
        [HttpGet]
        [Route("notloggedin")]
        public string NotLoggedIn()
        {
            Response.StatusCode = 401;
            return "You not logged in";
        }
    }
}