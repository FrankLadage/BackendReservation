﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ReserveerBackend.Controllers
{
    [Produces("application/json")]
    [Route("api/Login")]
    public class LoginController : Controller
    {
        private readonly ReserveerDBContext _context;

        public LoginController(ReserveerDBContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Login(string name, string password)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest("Username cannot be empty");
            }
            if (string.IsNullOrEmpty(password))
            {
                return BadRequest("Password cannot be empty");
            }
            //_context.Database.
            var userlogin = _context.UserPasswordLogins.Where(x => x.Username == name);
            if (userlogin.Count() != 1)
            {
                return BadRequest("User does not exist");
            }


            var first = userlogin.First();


            if(!PasswordLoginUtilities.CheckLogin(password, first))
            {
                return BadRequest("Password was incorrect");
            }

            var userdata = _context.Users.Where(x => x.Id == first.UserID).First();

            var identity = userdata.ToClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme);
            var principal = new ClaimsPrincipal(identity);

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                principal);
            return Ok(
String.Format(@"Logged in!
Username: {0}
Password: {1}
Role: {2}
Email: {3}
EmailNotifications: {4}", name, password, userdata.Role.ToString(), userdata.Email, userdata.EmailNotification.ToString()));
        }
    }
}