using Microsoft.AspNetCore.Mvc;
using ReserveerBackend.Controllers;
using System;
using System.Collections.Generic;
using System.Net;
using Xunit;

namespace XUnitTest
{
    public class UnitTest1
    {
        [Fact]
        public void AdminLoginTest()
        {
            var server = new Server();

            var usercontroller = new UsersController(server.database);
            usercontroller.Create("Admin", "Password", "email@email.com", "Admin").Wait();

            //var logincontroller = new LoginController(server.database);

            var result = server.Post("/api/Login", new Dictionary<string, string>() {
                { "Username", "Admin" },
                { "Password", "Password" },
            });
            Assert.Equal(HttpStatusCode.OK, result.StatusCode);

            var result2 = server.Post("/api/Login", new Dictionary<string, string>() {
                { "Username", "Notvalid" },
                { "Password", "Password" },
            });
            Assert.NotEqual(HttpStatusCode.OK, result2.StatusCode);
        }
    }
}
