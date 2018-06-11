using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReserveerBackend.Models;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace XUnitTest
{
    public static class Extentions
    {
        public static void SetUserIdentity(this Controller controller, User user)
        {
            var userclaims = new ClaimsPrincipal(user.ToClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme));
            controller.ControllerContext.HttpContext = new DefaultHttpContext()
            {
                User = userclaims
            };
        }
    }
}
