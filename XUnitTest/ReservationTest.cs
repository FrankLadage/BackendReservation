using ReserveerBackend;
using ReserveerBackend.Controllers;
using ReserveerBackend.Models;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Linq;
using Xunit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Threading;
using System.Security.Principal;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace XUnitTest
{
    public class ReservationTest
    {
        private class ServerWithState
        {
            public Server server;
            public UserPasswordLogin adminlogin, sdlogin, teacherlogin, studentlogin, adminstaticlogin, sdstaticlogin, teacherstaticlogin, studentstaticlogin;
            public User admin1, admin2, sd1, sd2, teacher1, teacher2, student1, student2;
            public Room room1, room2, room3, room4, room5;
            public Reservation reservationA, reservationB, reservationC, reservationD, reservationE, reservationF, reservationG;
            public Participant participant1, participant2, participant3, participant4, participant5, participant6;
            public ServerWithState()
            {

                server = new Server();

                adminlogin = PasswordLoginUtilities.GenerateNewLogin("adminlogin", "password");
                sdlogin = PasswordLoginUtilities.GenerateNewLogin("sdlogin", "password");
                teacherlogin = PasswordLoginUtilities.GenerateNewLogin("teacherlogin", "password");
                studentlogin = PasswordLoginUtilities.GenerateNewLogin("studentlogin", "password");

                adminstaticlogin = PasswordLoginUtilities.GenerateNewLogin("adminstatic", "password");
                sdstaticlogin = PasswordLoginUtilities.GenerateNewLogin("sdstatic", "password");
                teacherstaticlogin = PasswordLoginUtilities.GenerateNewLogin("teacherstatic", "password");
                studentstaticlogin = PasswordLoginUtilities.GenerateNewLogin("studentstatic", "password");

                admin1 = new User(adminlogin, Role.Admin, "admin1", true);
                sd1 = new User(sdlogin, Role.ServiceDesk, "sd1", true);
                teacher1 = new User(teacherlogin, Role.Teacher, "teacher1", true);
                student1 = new User(studentlogin, Role.Student, "student1", true);

                admin2 = new User(adminstaticlogin, Role.Admin, "admin2", true);
                sd2 = new User(sdstaticlogin, Role.ServiceDesk, "sd2", true);
                teacher2 = new User(teacherstaticlogin, Role.Teacher, "teacher2", true);
                student2 = new User(studentstaticlogin, Role.Student, "student2", true);
            
                server.database.Users.AddRange(new User[] { admin1, admin2, sd1, sd2, teacher1, teacher2, student1, student2});
                server.database.UserPasswordLogins.AddRange(new UserPasswordLogin[] { adminlogin, sdlogin, teacherlogin, studentlogin, adminstaticlogin, sdstaticlogin, teacherstaticlogin, studentstaticlogin});


                room1 = new Room("one", "a", 10, true, true, 5);
                room2 = new Room("two", "b", 20, true, true, 4);
                room3 = new Room("three", "c", 30, true, true, 3);
                room4 = new Room("four", "d", 40, true, true, 2);
                room5 = new Room("five", "e", 50, true, true, 1);

                server.database.Rooms.AddRange(new Room[] { room1, room2, room3, room4, room5});

                reservationA = new Reservation(new DateTime(2000, 1, 1), new DateTime(2000, 1, 2), true, true, "aaaa", room1);
                reservationB = new Reservation(new DateTime(2000, 1, 3), new DateTime(2000, 1, 4), true, true, "bbbb", room2);
                reservationC = new Reservation(new DateTime(2000, 1, 5), new DateTime(2000, 1, 6), true, true, "cccc", room3);
                reservationD = new Reservation(new DateTime(2000, 1, 7), new DateTime(2000, 1, 8), true, true, "dddd", room4);
                reservationE = new Reservation(new DateTime(2000, 1, 1), new DateTime(2000, 1, 2), true, false, "eeee", room3);
                reservationF = new Reservation(new DateTime(2000, 1, 3), new DateTime(2000, 1, 4), true, false, "ffff", room2);
                reservationG = new Reservation(new DateTime(2100, 1, 3), new DateTime(2100, 1, 4), false, true, "gggg", room5);
                
                server.database.Reservations.AddRange(new Reservation[] { reservationA, reservationB, reservationC, reservationD, reservationE, reservationF, reservationG});


                participant1 = new Participant(reservationA, admin1, true, new DateTime(1990, 1, 1));
                participant2 = new Participant(reservationB, sd1, true, new DateTime(1990, 1, 1));
                participant3 = new Participant(reservationC, teacher1, true, new DateTime(1990, 1, 1));
                participant4 = new Participant(reservationD, student1, true, new DateTime(1990, 1, 1));

                participant5 = new Participant(reservationE, admin1, true, new DateTime(1990, 1, 1));
                participant6 = new Participant(reservationF, student1, true, new DateTime(1990, 1, 1));

                server.database.AddRange(new Participant[] { participant1, participant2, participant3, participant4, participant5, participant6});
                server.database.SaveChanges();
            }
        }

        [Fact]
        public void GetAllReservations()
        {
            var server = new ServerWithState();
            var controller = new ReservationsController(server.server.database);
            var result = controller.GetMatch(null, null, null, null, null, null, null);
            Assert.True(result.ToHashSet().SetEquals(new Reservation[] { server.reservationA, server.reservationB, server.reservationC, server.reservationD, server.reservationE, server.reservationF, server.reservationG }));
        }
        [Fact]
        public void GetImmutable()
        {
            var server = new ServerWithState();
            var controller = new ReservationsController(server.server.database);
            var result = controller.GetMatch(null, null, false, null, null, null, null);
            Assert.True(result.ToHashSet().SetEquals(new Reservation[] { server.reservationE, server.reservationF }));
        }
        [Fact]
        public void GetWithDescription()
        {
            var server = new ServerWithState();
            var controller = new ReservationsController(server.server.database);
            var result = controller.GetMatch(null, null, null, "e", null, null, null);
            Assert.True(result.ToHashSet().SetEquals(new Reservation[] { server.reservationE }));
        }
        [Fact]
        public void GetBetweenDates()
        {
            var server = new ServerWithState();
            var controller = new ReservationsController(server.server.database);
            var result = controller.GetMatch(null, null, null, null, null, new DateTime(2000, 1, 4, 10, 0, 0), new DateTime(2000, 1, 8, 10, 0, 0));
            Assert.True(result.ToHashSet().SetEquals(new Reservation[] { server.reservationC, server.reservationD }));
        }
        [Fact]
        public void GetRoom()
        {
            var server = new ServerWithState();
            var controller = new ReservationsController(server.server.database);
            var result = controller.GetMatch(null, null, null, null, server.room3.Id, null, null);
            Assert.True(result.ToHashSet().SetEquals(new Reservation[] { server.reservationC, server.reservationE }));
        }
        [Fact]
        public void GetInactive()
        {
            var server = new ServerWithState();
            var controller = new ReservationsController(server.server.database);
            var result = controller.GetMatch(null, false, null, null, null, null, null);
            Assert.True(result.ToHashSet().SetEquals(new Reservation[] { server.reservationG }));
        }
        [Fact]
        public void GetID()
        {
            var server = new ServerWithState();
            var controller = new ReservationsController(server.server.database);
            var result = controller.GetMatch(server.reservationA.Id, null, null, null, null, null, null);
            Assert.True(result.ToHashSet().SetEquals(new Reservation[] { server.reservationA }));
        }

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

            var emailservice = new UnitTestEmailService();
            var startdate = new DateTime(2000, 1, 2);
            var enddate = new DateTime(2000, 1, 4);
            var description = "Reservation";
            return new Tuple<Server, IActionResult>(server,controller.AddReservation(emailservice, startdate, enddate, description, room.Id, Force));
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

            var emailservice = new UnitTestEmailService();
            var startdate2 = new DateTime(2000, 1, 2);
            var enddate2 = new DateTime(2000, 1, 4);
            var description = "Reservation";

            var result = controller.AddReservation(emailservice, startdate2, enddate2, description, room2.Id, Force);
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
            var roles = new Role[]{ Role.Student, Role.Teacher, Role.ServiceDesk, Role.Admin};
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
