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
    public class AddReservationsWithOverlapTests
    {
        private Tuple<Server, IActionResult> AddReservationOverlap(User Actor, User OtherOwner, bool IsMutable, bool Force)
        {
            var server = new Server();
            var room = new Room("room", "here", 1, true, false, 1);
            var otherreservation = new Reservation(new DateTime(2000, 1, 1), new DateTime(2000, 1, 3), true, IsMutable, "OtherReservation", room);

            server.database.Users.Add(Actor);
            server.database.Users.Add(OtherOwner);
            server.database.Rooms.Add(room);

            server.database.Reservations.Add(otherreservation);
            server.database.Participants.Add(new Participant(otherreservation, OtherOwner, true, new DateTime(2000, 1, 1)));
            server.database.SaveChanges();

            var controller = new ReservationsController(server.database);
            controller.SetUserIdentity(Actor);

            var startdate = new DateTime(2000, 1, 2);
            var enddate = new DateTime(2000, 1, 4);
            var description = "Reservation";
            return new Tuple<Server, IActionResult>(server, controller.AddReservation(server.EmailService, startdate, enddate, description, room.Id, Force));
        }

        [Fact]
        public void StudentStudentOverlapNoForce()
        {
            var actor = new User(Role.Student, "a", true);
            var other = new User(Role.Student, "b", true);

            var state = AddReservationOverlap(actor, other, true, false);

            Assert.IsType<ObjectResult>(state.Item2);
            Assert.Equal(409, (state.Item2 as ObjectResult).StatusCode);
            Assert.True(state.Item1.database.Reservations.Count() == 1);
            Assert.True(state.Item1.database.Participants.Count() == 1);
        }
        [Fact]
        public void StudentStudentOverlapForce()
        {
            var actor = new User(Role.Student, "a", true);
            var other = new User(Role.Student, "b", true);

            var state = AddReservationOverlap(actor, other, true, true);

            Assert.IsType<ObjectResult>(state.Item2);
            Assert.Equal(409, (state.Item2 as ObjectResult).StatusCode);
            Assert.True(state.Item1.database.Reservations.Count() == 1);
            Assert.True(state.Item1.database.Participants.Count() == 1);
        }
        [Fact]
        public void TeacherStudentOverlapNoForce()
        {
            var actor = new User(Role.Teacher, "a", true);
            var other = new User(Role.Student, "b", true);

            var state = AddReservationOverlap(actor, other, true, false);

            Assert.IsType<ObjectResult>(state.Item2);
            Assert.Equal(409, (state.Item2 as ObjectResult).StatusCode);
            Assert.True(state.Item1.database.Reservations.Count() == 1);
            Assert.True(state.Item1.database.Participants.Count() == 1);
        }
        [Fact]
        public void TeacherStudentOverlapForce()
        {
            var actor = new User(Role.Teacher, "a", true);
            var other = new User(Role.Student, "b", true);

            var state = AddReservationOverlap(actor, other, true, true);

            Assert.IsType<OkObjectResult>(state.Item2);
            var studentreservation = state.Item1.database.Participants.Where(x => x.UserID == other.Id).First().Reservation;
            var teacherreservation = state.Item1.database.Participants.Where(x => x.UserID == actor.Id).First().Reservation;
            Assert.True(studentreservation.EndDate <= teacherreservation.StartDate || studentreservation.StartDate >= teacherreservation.EndDate);
            Assert.True(state.Item1.database.Reservations.Count() == 2);
            Assert.True(state.Item1.database.Participants.Count() == 2);
        }
        [Fact]
        public void SDStudentOverlapNoForce()
        {
            var actor = new User(Role.ServiceDesk, "a", true);
            var other = new User(Role.Student, "b", true);

            var state = AddReservationOverlap(actor, other, true, false);

            Assert.IsType<ObjectResult>(state.Item2);
            Assert.Equal(409, (state.Item2 as ObjectResult).StatusCode);
            Assert.True(state.Item1.database.Reservations.Count() == 1);
            Assert.True(state.Item1.database.Participants.Count() == 1);
        }
        [Fact]
        public void SDStudentOverlapForce()
        {
            var actor = new User(Role.ServiceDesk, "a", true);
            var other = new User(Role.Student, "b", true);

            var state = AddReservationOverlap(actor, other, true, true);

            Assert.IsType<OkObjectResult>(state.Item2);
            var studentreservation = state.Item1.database.Participants.Where(x => x.UserID == other.Id).First().Reservation;
            var teacherreservation = state.Item1.database.Participants.Where(x => x.UserID == actor.Id).First().Reservation;
            Assert.True(studentreservation.EndDate <= teacherreservation.StartDate || studentreservation.StartDate >= teacherreservation.EndDate);
            Assert.True(state.Item1.database.Reservations.Count() == 2);
            Assert.True(state.Item1.database.Participants.Count() == 2);
        }
        [Fact]
        public void SDAdminOverlapNoForce()
        {
            var actor = new User(Role.ServiceDesk, "a", true);
            var other = new User(Role.Admin, "b", true);

            var state = AddReservationOverlap(actor, other, true, false);

            Assert.IsType<ObjectResult>(state.Item2);
            Assert.Equal(409, (state.Item2 as ObjectResult).StatusCode);
            Assert.True(state.Item1.database.Reservations.Count() == 1);
            Assert.True(state.Item1.database.Participants.Count() == 1);
        }
        [Fact]
        public void SDAdminOverlapForce()
        {
            var actor = new User(Role.ServiceDesk, "a", true);
            var other = new User(Role.Admin, "b", true);

            var state = AddReservationOverlap(actor, other, true, true);

            Assert.IsType<OkObjectResult>(state.Item2);
            var studentreservation = state.Item1.database.Participants.Where(x => x.UserID == other.Id).First().Reservation;
            var teacherreservation = state.Item1.database.Participants.Where(x => x.UserID == actor.Id).First().Reservation;
            Assert.True(studentreservation.EndDate <= teacherreservation.StartDate || studentreservation.StartDate >= teacherreservation.EndDate);
            Assert.True(state.Item1.database.Reservations.Count() == 2);
            Assert.True(state.Item1.database.Participants.Count() == 2);
        }
        [Fact]
        public void SDAdminOverlapNoForceImmutable()
        {
            var actor = new User(Role.ServiceDesk, "a", true);
            var other = new User(Role.Admin, "b", true);

            var state = AddReservationOverlap(actor, other, false, false);

            Assert.IsType<ObjectResult>(state.Item2);
            Assert.Equal(409, (state.Item2 as ObjectResult).StatusCode);
            Assert.True(state.Item1.database.Reservations.Count() == 1);
            Assert.True(state.Item1.database.Participants.Count() == 1);
        }
        [Fact]
        public void SDAdminOverlapForceImmutable()
        {
            var actor = new User(Role.ServiceDesk, "a", true);
            var other = new User(Role.Admin, "b", true);

            var state = AddReservationOverlap(actor, other, false, true);

            Assert.IsType<ObjectResult>(state.Item2);
            Assert.Equal(409, (state.Item2 as ObjectResult).StatusCode);
        }
        [Fact]
        public void StudentStudentOverlapNoForceImmutable()
        {
            var actor = new User(Role.Student, "a", true);
            var other = new User(Role.Student, "b", true);

            var state = AddReservationOverlap(actor, other, false, false);

            Assert.IsType<ObjectResult>(state.Item2);
            Assert.Equal(409, (state.Item2 as ObjectResult).StatusCode);
            Assert.True(state.Item1.database.Reservations.Count() == 1);
            Assert.True(state.Item1.database.Participants.Count() == 1);
        }
        [Fact]
        public void StudentStudentForceImmutable()
        {
            var actor = new User(Role.Student, "a", true);
            var other = new User(Role.Student, "b", true);

            var state = AddReservationOverlap(actor, other, false, true);

            Assert.IsType<ObjectResult>(state.Item2);
            Assert.Equal(409, (state.Item2 as ObjectResult).StatusCode);
        }
        [Fact]
        public void TeacherStudentOverlapNoForceImmutable()
        {
            var actor = new User(Role.Teacher, "a", true);
            var other = new User(Role.Student, "b", true);

            var state = AddReservationOverlap(actor, other, false, false);

            Assert.IsType<ObjectResult>(state.Item2);
            Assert.Equal(409, (state.Item2 as ObjectResult).StatusCode);
            Assert.True(state.Item1.database.Reservations.Count() == 1);
            Assert.True(state.Item1.database.Participants.Count() == 1);
        }
        [Fact]
        public void TeacherStudentForceImmutable()
        {
            var actor = new User(Role.Teacher, "a", true);
            var other = new User(Role.Student, "b", true);

            var state = AddReservationOverlap(actor, other, false, true);

            Assert.IsType<ObjectResult>(state.Item2);
            Assert.Equal(409, (state.Item2 as ObjectResult).StatusCode);
        }
        private void OverlapDifferentRooms(Role ActorRole, Role OtherOwnerRole, bool IsMutable, bool Force)
        {
            var Actor = new User(ActorRole, "a", true);
            var OtherOwner = new User(OtherOwnerRole, "b", true);
            var server = new Server();
            var room1 = new Room("room", "here", 1, true, false, 1);
            var room2 = new Room("room", "here", 1, true, false, 1);
            var startdate1 = new DateTime(2000, 1, 1);
            var enddate1 = new DateTime(2000, 1, 3);
            var otherreservation = new Reservation(startdate1, enddate1, true, IsMutable, "OtherReservation", room1);

            server.database.Users.Add(Actor);
            server.database.Users.Add(OtherOwner);
            server.database.Rooms.Add(room1);
            server.database.Rooms.Add(room2);

            server.database.Reservations.Add(otherreservation);
            server.database.Participants.Add(new Participant(otherreservation, OtherOwner, true, new DateTime(2000, 1, 1)));
            server.database.SaveChanges();

            var controller = new ReservationsController(server.database);
            controller.SetUserIdentity(Actor);

            var startdate2 = new DateTime(2000, 1, 2);
            var enddate2 = new DateTime(2000, 1, 4);
            var description = "Reservation";

            var result = controller.AddReservation(server.EmailService, startdate2, enddate2, description, room2.Id, Force);
            Assert.IsType<OkObjectResult>(result);
            var madereservation = server.database.Participants.Where(x => x.UserID == Actor.Id).First().Reservation;

            Assert.True(otherreservation.StartDate == startdate1 && otherreservation.EndDate == enddate1);
            Assert.True(otherreservation.Participants.First().User == OtherOwner);
            Assert.True(madereservation.StartDate == startdate2 && madereservation.EndDate == enddate2);
            Assert.True(madereservation.Participants.First().User == Actor);
        }
        [Fact]
        public void DifferentRoomAllCombinations()
        {
            var roles = new Role[] { Role.Student, Role.Teacher, Role.ServiceDesk, Role.Admin };
            var bools = new bool[] { true, false };
            foreach (var actorrole in roles)
            {
                foreach (var otherownerrole in roles)
                {
                    foreach (var mutable in bools)
                    {
                        foreach (var force in bools)
                        {
                            OverlapDifferentRooms(actorrole, otherownerrole, mutable, force);
                        }
                    }
                }
            }
        }
    }
}
