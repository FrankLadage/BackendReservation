using Microsoft.AspNetCore.Mvc;
using ReserveerBackend;
using ReserveerBackend.Controllers;
using ReserveerBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace XUnitTest.ReservationTests
{
    public class AddReservationNoOverlapTests
    {
        private void AddReservationNoOverlap(User user)
        {
            var server = new Server();
            var room = new Room("room1", "here", 1, true, false, 1);
            server.database.Users.Add(user);
            server.database.Rooms.Add(room);
            server.database.SaveChanges();
            var controller = new ReservationsController(server.database);
            controller.SetUserIdentity(user);
            var emailservice = new UnitTestEmailService();
            var startdate = new DateTime(2000, 1, 1);
            var enddate = new DateTime(2000, 3, 1);
            var description = "Reservation";
            var result = controller.AddReservation(emailservice, startdate, enddate, description, room.Id);

            Assert.IsType<OkObjectResult>(result);
            Assert.Equal((result as OkObjectResult).Value, server.database.Reservations.First().Id.ToString());

            Assert.True(server.database.Participants.Where(x => x.UserID == user.Id).Where(x => x.IsOwner).Count() == 1);
            Assert.True(server.database.Participants.Count() == 1);

            Assert.True(server.database.Reservations.Where(x => x.StartDate == startdate).Where(x => x.EndDate == enddate).Where(x => x.Description == description).Where(x => x.Room == room).Count() == 1);
            Assert.True(server.database.Reservations.Count() == 1);
        }

        [Fact]
        public void AddReservationNoOverlapStudent()
        {
            var user = new User(Role.Student, "hhh", true);
            AddReservationNoOverlap(user);
        }
        [Fact]
        public void AddReservationNoOverlapTeacher()
        {
            var user = new User(Role.Teacher, "hhh", true);
            AddReservationNoOverlap(user);
        }
        [Fact]
        public void AddReservationNoOverlapSD()
        {
            var user = new User(Role.ServiceDesk, "hhh", true);
            AddReservationNoOverlap(user);
        }
        [Fact]
        public void AddReservationNoOverlapAdmin()
        {
            var user = new User(Role.Admin, "hhh", true);
            AddReservationNoOverlap(user);
        }

    }
}
