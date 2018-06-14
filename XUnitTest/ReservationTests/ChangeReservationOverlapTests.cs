using Microsoft.AspNetCore.Mvc;
using ReserveerBackend;
using ReserveerBackend.Controllers;
using ReserveerBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace XUnitTest.ReservationTests
{
    public class ChangeReservationOverlapTests
    {
        private void ChangeReservationOverlap(User actor, User owner)
        {
            var server = new Server();
            var room1 = new Room("room1", "here", 1, true, false, 1);
            if (actor == owner)
            {
                server.database.Users.Add(actor);
            }
            else
            {
                server.database.Users.Add(actor);
                server.database.Users.Add(owner);
            }
            server.database.Rooms.Add(room1);
            server.database.SaveChanges();
            var controller = new ReservationsController(server.database);
            controller.SetUserIdentity(owner);
            var emailservice = new UnitTestEmailService();
            var startdate = new DateTime(2000, 1, 1);
            var enddate = new DateTime(2000, 3, 1);
            var description = "Reservation";

            var otherstartdate = new DateTime(2001, 1, 1);
            var otherenddate = new DateTime(2001, 3, 1);

            var tempresult = controller.AddReservation(emailservice, startdate, enddate, description, room1.Id);
            Assert.IsType<OkObjectResult>(tempresult); //IF this is not true, then the addreservation does not work.
            controller.SetUserIdentity(actor);
            tempresult = controller.AddReservation(emailservice, otherstartdate, otherenddate, description, room1.Id);
            Assert.IsType<OkObjectResult>(tempresult);

            var reservation = server.database.Reservations.Where(x => x.StartDate == startdate).First();
            var otherreservation = server.database.Reservations.Where(x => x.StartDate == otherstartdate).First();

            var newstartdate = new DateTime(2000, 2, 1);
            var neweneddate = new DateTime(2000, 4, 1);

            var result = controller.ChangeReservation(emailservice, otherreservation.Id, newstartdate, neweneddate, null, null, null, true);

            Assert.IsType<OkObjectResult>(result);
            Assert.Equal(newstartdate, reservation.EndDate);
            Assert.Equal(startdate, reservation.StartDate);
            Assert.Equal(newstartdate, otherreservation.StartDate);
            Assert.Equal(neweneddate, otherreservation.EndDate);
        }

        private void ChangeReservationOverlapUnAuthorized(User actor, User owner)
        {
            var server = new Server();
            var room1 = new Room("room1", "here", 1, true, false, 1);
            if (actor == owner)
            {
                server.database.Users.Add(actor);
            }
            else
            {
                server.database.Users.Add(actor);
                server.database.Users.Add(owner);
            }
            server.database.Rooms.Add(room1);
            server.database.SaveChanges();
            var controller = new ReservationsController(server.database);
            controller.SetUserIdentity(owner);
            var emailservice = new UnitTestEmailService();
            var startdate = new DateTime(2000, 1, 1);
            var enddate = new DateTime(2000, 3, 1);
            var description = "Reservation";

            var otherstartdate = new DateTime(2001, 1, 1);
            var otherenddate = new DateTime(2001, 3, 1);

            var tempresult = controller.AddReservation(emailservice, startdate, enddate, description, room1.Id);
            Assert.IsType<OkObjectResult>(tempresult); //IF this is not true, then the addreservation does not work.
            controller.SetUserIdentity(actor);
            tempresult = controller.AddReservation(emailservice, otherstartdate, otherenddate, description, room1.Id);
            Assert.IsType<OkObjectResult>(tempresult);

            var reservation = server.database.Participants.Where(x => x.UserID == owner.Id).First().Reservation;
            var otherreservation = server.database.Participants.Where(x => x.UserID == actor.Id).First().Reservation;

            var newstartdate = new DateTime(2000, 2, 1);
            var neweneddate = new DateTime(2000, 4, 1);

            var result = controller.ChangeReservation(emailservice, otherreservation.Id, newstartdate, neweneddate, null, null, null, true);

            Assert.IsType<UnauthorizedResult>(result);
            Assert.Equal(enddate, reservation.EndDate);
            Assert.Equal(startdate, reservation.StartDate);
            Assert.Equal(otherenddate, otherreservation.EndDate);
            Assert.Equal(otherstartdate, otherreservation.StartDate);
        }

        [Fact]
        public void StudentAll()
        {
            foreach (var role in new Role[] { Role.Admin, Role.ServiceDesk, Role.Student, Role.Teacher })
            {
                ChangeReservationOverlapUnAuthorized(new User(Role.Student, "", true), new User(role, "", true));
            }
        }

        [Fact]
        public void TeacherTeacherAndUp()
        {
            foreach (var role in new Role[] { Role.Admin, Role.ServiceDesk, Role.Teacher })
            {
                ChangeReservationOverlapUnAuthorized(new User(Role.Teacher, "", true), new User(role, "", true));
            }
        }

        [Fact]
        public void TeacherStudent()
        {
            ChangeReservationOverlap(new User(Role.Teacher, "", true), new User(Role.Student, "", true));
        }

        [Fact]
        public void SdAll()
        {
            foreach (var role in new Role[] { Role.Admin, Role.ServiceDesk, Role.Student, Role.Teacher })
            {
                ChangeReservationOverlap(new User(Role.ServiceDesk, "", true), new User(role, "", true));
            }
        }
        [Fact]
        public void AdminAll()
        {
            foreach (var role in new Role[] { Role.Admin, Role.ServiceDesk, Role.Student, Role.Teacher })
            {
                ChangeReservationOverlap(new User(Role.Admin, "", true), new User(role, "", true));
            }
        }
        [Fact]
        public void StudentSelf()
        {
            var user = new User(Role.Student, "", true);
            ChangeReservationOverlap(user, user);
        }
        [Fact]
        public void TeacherSelf()
        {
            var user = new User(Role.Teacher, "", true);
            ChangeReservationOverlap(user, user);
        }
        [Fact]
        public void SDSelf()
        {
            var user = new User(Role.ServiceDesk, "", true);
            ChangeReservationOverlap(user, user);
        }
        [Fact]
        public void AdminSelf()
        {
            var user = new User(Role.Admin, "", true);
            ChangeReservationOverlap(user, user);
        }
    }
}
