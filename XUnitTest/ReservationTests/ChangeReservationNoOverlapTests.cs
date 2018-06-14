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

        private void ChangeReservationNoOverlap(User user, DateTime? newStartTime, DateTime? newEndTime, string newDescription, Room newRoom, bool Force, bool? isActive)
        {
            var server = new Server();
            var room1 = new Room("room1", "here", 1, true, false, 1);
            server.database.Users.Add(user);
            server.database.Rooms.Add(room1);
            if(newRoom != null)
                server.database.Rooms.Add(newRoom);
            server.database.SaveChanges();
            var controller = new ReservationsController(server.database);
            controller.SetUserIdentity(user);
            var emailservice = new UnitTestEmailService();
            var startdate = new DateTime(2000, 1, 1);
            var enddate = new DateTime(2000, 3, 1);
            var description = "Reservation";
            
            var tempresult = controller.AddReservation(emailservice, startdate, enddate, description, room1.Id);
            Assert.IsType<OkObjectResult>(tempresult); //IF this is not true, then the addreservation does not work.

            var reservation = server.database.Reservations.First();

            var result = controller.ChangeReservation(emailservice, reservation.Id, newStartTime, newEndTime, newDescription, newRoom == null ? null : (int?)newRoom.Id, isActive, Force);

            Assert.IsType<OkObjectResult>(result);
            Assert.Equal(newStartTime.HasValue ? newStartTime.Value : startdate, reservation.StartDate);
            Assert.Equal(newEndTime.HasValue ? newEndTime.Value : enddate, reservation.EndDate);
            Assert.Equal(newDescription != null ? newDescription : description, reservation.Description);
            Assert.Equal(newRoom != null ? newRoom : room1, reservation.Room);
            Assert.Equal(isActive.HasValue ? isActive.Value : true, reservation.Active);
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
                                        ChangeReservationNoOverlap(user, starttime(), endtime(), description(), room(), force, active());
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }
    }
}
