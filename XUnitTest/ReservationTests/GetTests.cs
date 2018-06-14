using ReserveerBackend.Controllers;
using ReserveerBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace XUnitTest.ReservationTests
{
    public class GetTests
    {
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
    }
}
