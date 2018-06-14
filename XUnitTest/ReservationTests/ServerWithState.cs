using ReserveerBackend;
using ReserveerBackend.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace XUnitTest.ReservationTests
{
    class ServerWithState
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

            server.database.Users.AddRange(new User[] { admin1, admin2, sd1, sd2, teacher1, teacher2, student1, student2 });
            server.database.UserPasswordLogins.AddRange(new UserPasswordLogin[] { adminlogin, sdlogin, teacherlogin, studentlogin, adminstaticlogin, sdstaticlogin, teacherstaticlogin, studentstaticlogin });


            room1 = new Room("one", "a", 10, true, true, 5);
            room2 = new Room("two", "b", 20, true, true, 4);
            room3 = new Room("three", "c", 30, true, true, 3);
            room4 = new Room("four", "d", 40, true, true, 2);
            room5 = new Room("five", "e", 50, true, true, 1);

            server.database.Rooms.AddRange(new Room[] { room1, room2, room3, room4, room5 });

            reservationA = new Reservation(new DateTime(2000, 1, 1), new DateTime(2000, 1, 2), true, true, "aaaa", room1);
            reservationB = new Reservation(new DateTime(2000, 1, 3), new DateTime(2000, 1, 4), true, true, "bbbb", room2);
            reservationC = new Reservation(new DateTime(2000, 1, 5), new DateTime(2000, 1, 6), true, true, "cccc", room3);
            reservationD = new Reservation(new DateTime(2000, 1, 7), new DateTime(2000, 1, 8), true, true, "dddd", room4);
            reservationE = new Reservation(new DateTime(2000, 1, 1), new DateTime(2000, 1, 2), true, false, "eeee", room3);
            reservationF = new Reservation(new DateTime(2000, 1, 3), new DateTime(2000, 1, 4), true, false, "ffff", room2);
            reservationG = new Reservation(new DateTime(2100, 1, 3), new DateTime(2100, 1, 4), false, true, "gggg", room5);

            server.database.Reservations.AddRange(new Reservation[] { reservationA, reservationB, reservationC, reservationD, reservationE, reservationF, reservationG });


            participant1 = new Participant(reservationA, admin1, true, new DateTime(1990, 1, 1));
            participant2 = new Participant(reservationB, sd1, true, new DateTime(1990, 1, 1));
            participant3 = new Participant(reservationC, teacher1, true, new DateTime(1990, 1, 1));
            participant4 = new Participant(reservationD, student1, true, new DateTime(1990, 1, 1));

            participant5 = new Participant(reservationE, admin1, true, new DateTime(1990, 1, 1));
            participant6 = new Participant(reservationF, student1, true, new DateTime(1990, 1, 1));

            server.database.AddRange(new Participant[] { participant1, participant2, participant3, participant4, participant5, participant6 });
            server.database.SaveChanges();
        }
    }
}
