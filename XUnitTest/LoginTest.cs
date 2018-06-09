using Microsoft.AspNetCore.Mvc;
using ReserveerBackend.Controllers;
using System;
using System.Collections.Generic;
using System.Net;
using Xunit;

namespace XUnitTest
{
    public class LoginTest
    {
        private Server CleanServer()
        {
            var server = new Server();

            var usercontroller = new UsersController(server.database);
            usercontroller.Create("Admin", "Password", "email@email.com", "Admin").Wait();
            return server;
        }

        [Fact]
        public void Valid()
        {
            var result = CleanServer().Post("/api/Login", new Dictionary<string, string>() {
                { "name", "Admin" },
                { "password", "Password" }
            });
            Assert.Equal(HttpStatusCode.OK, result.StatusCode);
        }

        [Fact]
        public void WrongUsername()
        {
            var result = CleanServer().Post("/api/Login", new Dictionary<string, string>() {
                { "name", "Notvalid" },
                { "password", "Password" }
            });
            Assert.NotEqual(HttpStatusCode.OK, result.StatusCode);
        }

        [Fact]
        public void WrongPassword()
        {
            var result = CleanServer().Post("/api/Login", new Dictionary<string, string>() {
                { "name", "Admin" },
                { "password", "worrrd" }
            });
            Assert.NotEqual(HttpStatusCode.OK, result.StatusCode);
        }

        [Fact]
        public void MissingName()
        {
            var result = CleanServer().Post("/api/Login", new Dictionary<string, string>() {
                { "password", "Password" }
            });
            Assert.Equal(HttpStatusCode.BadRequest, result.StatusCode);
        }

        [Fact]
        public void MissingPassword()
        {
            var result = CleanServer().Post("/api/Login", new Dictionary<string, string>() {
                { "name", "Admin" }
            });
            Assert.Equal(HttpStatusCode.BadRequest, result.StatusCode);
        }

        [Fact]
        public void MissingBoth()
        {
            var result = CleanServer().Post("/api/Login", new Dictionary<string, string>());
            Assert.Equal(HttpStatusCode.BadRequest, result.StatusCode);
        }
    }
}
