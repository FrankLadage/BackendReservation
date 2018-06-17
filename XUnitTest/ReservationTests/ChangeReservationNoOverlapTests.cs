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
    public class ChangeReservationNoOverlapTests
    {

        private void ChangeReservationNoOverlap(User actor, User owner, DateTime? newStartTime, DateTime? newEndTime, string newDescription, Room newRoom, bool Force, bool? isActive)
        {
            var server = new Server();
            var room1 = new Room("room1", "here", 1, true, false, 1);
            if(actor == owner)
            {
                server.database.Users.Add(actor);
            }
            else
            {
                server.database.Users.Add(actor);
                server.database.Users.Add(owner);
            }
            server.database.Rooms.Add(room1);
            if(newRoom != null)
                server.database.Rooms.Add(newRoom);
            server.database.SaveChanges();
            var controller = new ReservationsController(server.database);
            controller.SetUserIdentity(owner);
            var startdate = new DateTime(2000, 1, 1);
            var enddate = new DateTime(2000, 3, 1);
            var description = "Reservation";
            
            var tempresult = controller.AddReservation(server.EmailService, startdate, enddate, description, room1.Id);
            Assert.IsType<OkObjectResult>(tempresult); //IF this is not true, then the addreservation does not work.
            controller.SetUserIdentity(actor);
            var reservation = server.database.Reservations.First();

            var result = controller.ChangeReservation(server.EmailService, reservation.Id, newStartTime, newEndTime, newDescription, newRoom == null ? null : (int?)newRoom.Id, isActive, Force);

            Assert.IsType<OkObjectResult>(result);
            Assert.Equal(newStartTime.HasValue ? newStartTime.Value : startdate, reservation.StartDate);
            Assert.Equal(newEndTime.HasValue ? newEndTime.Value : enddate, reservation.EndDate);
            Assert.Equal(newDescription != null ? newDescription : description, reservation.Description);
            Assert.Equal(newRoom != null ? newRoom : room1, reservation.Room);
            Assert.Equal(isActive.HasValue ? isActive.Value : true, reservation.Active);
        }
        private void ChangeReservationNoOverlapUnauthorized(User actor, User owner, DateTime? newStartTime, DateTime? newEndTime, string newDescription, Room newRoom, bool Force, bool? isActive)
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
            if (newRoom != null)
                server.database.Rooms.Add(newRoom);
            server.database.SaveChanges();
            var controller = new ReservationsController(server.database);
            controller.SetUserIdentity(owner);
            var startdate = new DateTime(2000, 1, 1);
            var enddate = new DateTime(2000, 3, 1);
            var description = "Reservation";

            var tempresult = controller.AddReservation(server.EmailService, startdate, enddate, description, room1.Id);
            Assert.IsType<OkObjectResult>(tempresult); //IF this is not true, then the addreservation does not work.
            controller.SetUserIdentity(actor);
            var reservation = server.database.Reservations.First();

            var result = controller.ChangeReservation(server.EmailService, reservation.Id, newStartTime, newEndTime, newDescription, newRoom == null ? null : (int?)newRoom.Id, isActive, Force);
            Assert.IsType<UnauthorizedResult>(result);
            Assert.Equal(startdate, reservation.StartDate);
            Assert.Equal(enddate, reservation.EndDate);
            Assert.Equal(description, reservation.Description);
            Assert.Equal(room1, reservation.Room);
            Assert.Equal(true, reservation.Active);
        }


        [Fact]
        public void AllOptions()
        {
            Parallel.ForEach(new Role[] { Role.Admin, Role.ServiceDesk, Role.Student, Role.Teacher }, userRole => {
                foreach (var starttime in new Func<DateTime?>[] { () => null, () => new DateTime(2000, 2, 1) })
                {
                    foreach (var endtime in new Func<DateTime?>[] { () => null, () => new DateTime(2000, 4, 1) })
                    {
                        foreach (var description in new Func<string>[] { () => null, () => "NewDescription" })
                        {
                            foreach (var room in new Func<Room>[] { () => null, () => new Room("Newroom", "There", 1, true, true, 10) })
                            {
                                foreach (var force in new bool[] { false, true })
                                {
                                    foreach (var active in new Func<bool?>[] { () => null, () => false})
                                    {
                                        var user = new User(userRole, "a", true);
                                        ChangeReservationNoOverlap(user, user, starttime(), endtime(), description(), room(), force, active());
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }

        private void DifferentOwnerAllowed(Role actor, Role owner)
        {
            Parallel.ForEach(new Func<DateTime?>[] { () => null, () => new DateTime(2000, 2, 1) }, starttime =>
            {
                Parallel.ForEach(new Func<DateTime?>[] { () => null, () => new DateTime(2000, 4, 1) }, endtime =>
                {
                    Parallel.ForEach(new Func<string>[] { () => null, () => "NewDescription" }, description =>
                    {
                        foreach (var room in new Func<Room>[] { () => null, () => new Room("Newroom", "There", 1, true, true, 10) })
                        {
                            foreach (var force in new bool[] { false, true })
                            {
                                foreach (var active in new Func<bool?>[] { () => null, () => false })
                                {
                                    ChangeReservationNoOverlap(new User(actor, "a", true), new User(owner, "a", true), starttime(), endtime(), description(), room(), force, active());
                                }
                            }
                        }
                    });
                });
            });
        }

        private void DifferentOwnerUnAuthorized(Role actor, Role owner)
        {
            Parallel.ForEach(new Func<DateTime?>[] { () => null, () => new DateTime(2000, 2, 1) }, starttime =>
            {
                Parallel.ForEach(new Func<DateTime?>[] { () => null, () => new DateTime(2000, 4, 1) }, endtime =>
                {
                    Parallel.ForEach(new Func<string>[] { () => null, () => "NewDescription" }, description =>
                    {
                        foreach (var room in new Func<Room>[] { () => null, () => new Room("Newroom", "There", 1, true, true, 10) })
                        {
                            foreach (var force in new bool[] { false, true })
                            {
                                foreach (var active in new Func<bool?>[] { () => null, () => false })
                                {
                                    ChangeReservationNoOverlapUnauthorized(new User(actor, "a", true), new User(owner, "a", true), starttime(), endtime(), description(), room(), force, active());
                                }
                            }
                        }
                    });
                });
            });
        }

        [Fact]
        public void SDStudent()
        {
            DifferentOwnerAllowed(Role.ServiceDesk, Role.Student);
        }
        [Fact]
        public void AdminStudent()
        {
            DifferentOwnerAllowed(Role.Admin, Role.Student);
        }
        [Fact]
        public void SDTeacher()
        {
            DifferentOwnerAllowed(Role.ServiceDesk, Role.Teacher);
        }
        [Fact]
        public void AdminTeacher()
        {
            DifferentOwnerAllowed(Role.Admin, Role.Teacher);
        }
        [Fact]
        public void SDSD()
        {
            DifferentOwnerAllowed(Role.ServiceDesk, Role.ServiceDesk);
        }
        [Fact]
        public void AdminSD()
        {
            DifferentOwnerAllowed(Role.Admin, Role.ServiceDesk);
        }
        [Fact]
        public void SDAdmin()
        {
            DifferentOwnerAllowed(Role.ServiceDesk, Role.Admin);
        }

        [Fact]
        public void StudentAll()
        {
            foreach (var role in new Role[] { Role.Admin, Role.ServiceDesk, Role.Student, Role.Teacher })
            {
                DifferentOwnerUnAuthorized(Role.Student, role);
            }
        }
        [Fact]
        public void TeacherTeacherAndUp()
        {
            foreach (var role in new Role[] { Role.Admin, Role.ServiceDesk, Role.Student, Role.Teacher })
            {
                DifferentOwnerUnAuthorized(Role.Teacher, role);
            }
        }
    }
}
