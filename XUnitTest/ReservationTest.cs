using ReserveerBackend;
using ReserveerBackend.Controllers;
using ReserveerBackend.Models;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace XUnitTest
{
    public class ReservationTest
    {
        private Tuple<Server, User[], Room[]> CleanServer()
        {
            var server = new Server();

            var passwordlogins = new UserPasswordLogin[]
            {
                PasswordLoginUtilities.GenerateNewLogin("adminlogin", "password"),
                PasswordLoginUtilities.GenerateNewLogin("sdlogin", "password"),
                PasswordLoginUtilities.GenerateNewLogin("teacherlogin", "password"),
                PasswordLoginUtilities.GenerateNewLogin("studentlogin", "password"),

                PasswordLoginUtilities.GenerateNewLogin("adminstatic", "password"),
                PasswordLoginUtilities.GenerateNewLogin("sdstatic", "password"),
                PasswordLoginUtilities.GenerateNewLogin("teacherstatic", "password"),
                PasswordLoginUtilities.GenerateNewLogin("studentstatic", "password")
            };

            var users = new User[]{
                new User(passwordlogins[0], Role.Admin, "admin1", true),
                new User(passwordlogins[1], Role.ServiceDesk, "sd1", true),
                new User(passwordlogins[2], Role.Teacher, "teacher1", true),
                new User(passwordlogins[3], Role.Student, "student1", true),

                new User(passwordlogins[4], Role.Admin, "admin2", true),
                new User(passwordlogins[5], Role.ServiceDesk, "sd2", true),
                new User(passwordlogins[6], Role.Teacher, "teacher2", true),
                new User(passwordlogins[7], Role.Student, "student2", true)
            };
            server.database.Users.AddRange(users);
            server.database.UserPasswordLogins.AddRange(passwordlogins);

            var rooms = new Room[]
            {
                new Room("one", "a", 10, true, true, 5),
                new Room("two", "b", 20, true, true, 4),
                new Room("three", "c", 30, true, true, 3),
                new Room("four", "d", 40, true, true, 2),
                new Room("five", "e", 50, true, true, 1)
            };
            server.database.Rooms.AddRange(rooms);

            var reservations = new Reservation[]
            {
                new Reservation(new DateTime(2000, 1, 1), new DateTime(2000, 1, 2), true, true, "1", rooms[0]),
                new Reservation(new DateTime(2000, 1, 3), new DateTime(2000, 1, 4), true, true, "1", rooms[1]),
                new Reservation(new DateTime(2000, 1, 5), new DateTime(2000, 1, 6), true, true, "1", rooms[2]),
                new Reservation(new DateTime(2000, 1, 7), new DateTime(2000, 1, 8), true, true, "1", rooms[3]),


                new Reservation(new DateTime(2000, 1, 1), new DateTime(2000, 1, 2), true, false, "1", rooms[0]),
                new Reservation(new DateTime(2000, 1, 3), new DateTime(2000, 1, 4), true, false, "1", rooms[1])
            };
            server.database.Reservations.AddRange(reservations);

            var participants = new Participant[]
            {
                new Participant(reservations[0], users[0], true, new DateTime(1990,1,1)),
                new Participant(reservations[1], users[1], true, new DateTime(1990,1,1)),
                new Participant(reservations[2], users[2], true, new DateTime(1990,1,1)),
                new Participant(reservations[3], users[3], true, new DateTime(1990,1,1)),

                new Participant(reservations[4], users[0], true, new DateTime(1990,1,1)),
                new Participant(reservations[5], users[3], true, new DateTime(1990,1,1))
            };

            return new Tuple<Server, User[], Room[]>(server, users, rooms);
        }

        [Fact]
        public void GetReservations()
        {

        }

    }
}
