using Microsoft.AspNetCore.Mvc;
using ReserveerBackend.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace XUnitTest.ReservationTests
{
    public class AddParticipantTests
    {
        [Fact]
        public void AddParticipantAsStudentOwner()
        {
            var server = new ServerWithState();
            var loggedinuser = server.student1;
            var useraddnotowner = server.sd1;
            var useraddowner = server.teacher1;
            var reservation = server.reservationD;

            var controller = new ReservationsController(server.server.database);
            controller.SetUserIdentity(loggedinuser);

            var result = controller.AddParticipants(new List<int>() { useraddowner.Id }, new List<int>() { useraddnotowner.Id }, reservation.Id);

            Assert.IsType<OkObjectResult>(result);
            Assert.True(server.server.database.Participants.Where(x => x.User == loggedinuser).Where(x => x.ReservationID == reservation.Id).Where(x => x.IsOwner == true).Count() == 1);
            Assert.True(server.server.database.Participants.Where(x => x.User == useraddnotowner).Where(x => x.ReservationID == reservation.Id).Where(x => x.IsOwner == false).Count() == 1);
            Assert.True(server.server.database.Participants.Where(x => x.User == useraddowner).Where(x => x.ReservationID == reservation.Id).Where(x => x.IsOwner == true).Count() == 1);
        }
        [Fact]
        public void AddParticipantAsStudentNotOwner()
        {
            var server = new ServerWithState();
            var loggedinuser = server.student1;
            var useraddnotowner = server.sd1;
            var useraddowner = server.teacher2;
            var reservation = server.reservationC;

            var controller = new ReservationsController(server.server.database);
            controller.SetUserIdentity(loggedinuser);

            var result = controller.AddParticipants(new List<int>() { useraddowner.Id }, new List<int>() { useraddnotowner.Id }, reservation.Id);

            Assert.IsType<UnauthorizedResult>(result);
            Assert.False(server.server.database.Participants.Where(x => x.User == useraddnotowner).Where(x => x.ReservationID == reservation.Id).Where(x => x.IsOwner == false).Count() == 1);
            Assert.False(server.server.database.Participants.Where(x => x.User == useraddowner).Where(x => x.ReservationID == reservation.Id).Where(x => x.IsOwner == true).Count() == 1);
        }
        [Fact]
        public void AddParticipantAsSDNotOwner()
        {
            var server = new ServerWithState();
            var loggedinuser = server.sd1;
            var useraddnotowner = server.admin1;
            var useraddowner = server.teacher2;
            var reservation = server.reservationC;

            var controller = new ReservationsController(server.server.database);
            controller.SetUserIdentity(loggedinuser);

            var result = controller.AddParticipants(new List<int>() { useraddowner.Id }, new List<int>() { useraddnotowner.Id }, reservation.Id);

            Assert.IsType<OkObjectResult>(result);
            Assert.True(server.server.database.Participants.Where(x => x.User == useraddnotowner).Where(x => x.ReservationID == reservation.Id).Where(x => x.IsOwner == false).Count() == 1);
            Assert.True(server.server.database.Participants.Where(x => x.User == useraddowner).Where(x => x.ReservationID == reservation.Id).Where(x => x.IsOwner == true).Count() == 1);
        }
        [Fact]
        public void AddParticipantAsAdminNotOwner()
        {
            var server = new ServerWithState();
            var loggedinuser = server.admin1;
            var useraddnotowner = server.sd1;
            var useraddowner = server.teacher2;
            var reservation = server.reservationC;

            var controller = new ReservationsController(server.server.database);
            controller.SetUserIdentity(loggedinuser);

            var result = controller.AddParticipants(new List<int>() { useraddowner.Id }, new List<int>() { useraddnotowner.Id }, reservation.Id);

            Assert.IsType<OkObjectResult>(result);
            Assert.True(server.server.database.Participants.Where(x => x.User == useraddnotowner).Where(x => x.ReservationID == reservation.Id).Where(x => x.IsOwner == false).Count() == 1);
            Assert.True(server.server.database.Participants.Where(x => x.User == useraddowner).Where(x => x.ReservationID == reservation.Id).Where(x => x.IsOwner == true).Count() == 1);
        }

    }
}
