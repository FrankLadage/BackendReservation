using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ReserveerBackend;
using ReserveerBackend.Models;

namespace ReserveerBackend.Controllers
{
    [Produces("application/json")]
    [Route("api/Users")]
    public class UsersController : Controller
    {
        private readonly ReserveerDBContext _context;

        public UsersController(ReserveerDBContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Creates a new user
        /// </summary>
        /// <param name="Username"></param>
        /// <param name="Password"></param>
        /// <param name="email"></param>
        /// <param name="role"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("CreateUsernamePassword")]
        [Authorize(Roles = Authorization.AdminOrHigher)]
        public async Task<IActionResult> Create(string Username, string Password, string email, string role)
        {
            if(String.IsNullOrEmpty(Username) || String.IsNullOrEmpty(Password) || String.IsNullOrEmpty(email) || String.IsNullOrEmpty(role))
            {
                return BadRequest("Fields not filled in");
            }
            Role? castrole = Authorization.FromString(role);
            if (!castrole.HasValue)
            {
                return BadRequest("Role is invalid");
            }
            var newuser = new User(PasswordLoginUtilities.GenerateNewLogin(Username, Password), castrole.Value, email, true);

            if (DoesUserExist(newuser.PasswordLogin))
            {
                var result = new ContentResult();
                result.StatusCode = 409;
                result.Content = "User already exists";
                return result;
            }

            _context.Users.Add(newuser);
            _context.SaveChanges();
            newuser.PasswordLogin.UserID = newuser.Id;
            _context.SaveChanges();
            return Ok(string.Format("Succesfully registered user with username: {0}", Username));
        }

        /// <summary>
        /// Gets all users matching a given description
        /// </summary>
        /// <param name="Username"></param>
        /// <param name="email"></param>
        /// <param name="role"></param>
        /// <param name="Id"></param>
        /// <param name="emailnotifications"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetUsers")]
        [Authorize(Roles = Authorization.ServiceOrHigher)]
        public IEnumerable<User> GetUsers(string Username, string email, string role, int? Id, bool? emailnotifications)
        {
            var users = _context.Users.AsQueryable();
            if (!String.IsNullOrEmpty(Username))
                users = users.Where(x => x.PasswordLogin.Username == Username);
            if (!String.IsNullOrEmpty(email))
                users = users.Where(x => x.Email == email);
            var castrole = Authorization.FromString(role);
            if (castrole.HasValue)
                users = users.Where(x => x.Role == castrole.Value);
            if (Id.HasValue)
                users = users.Where(x => x.Id == Id.Value);
            if (emailnotifications.HasValue)
                users = users.Where(x => x.EmailNotification == emailnotifications.Value);
            return users;
        }

        private bool DoesUserExist(UserPasswordLogin userlogin)
        {
            if (_context.UserPasswordLogins.Count() < 1)
                return false;
            return _context.UserPasswordLogins.Where(u => u.Username == userlogin.Username).Count() > 0;
        }
    }
}
