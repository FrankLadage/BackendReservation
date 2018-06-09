using ReserveerBackend.MessagingSystem;
using ReserveerBackend.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace XUnitTest
{
    class UnitTestEmailService : IEmailService
    {
        Dictionary<User, Tuple<User, string>> Messages = new Dictionary<User, Tuple<User, string>>();

        public override void SendNotification(User receiver, User sender, string message)
        {
            Messages.Add(receiver, new Tuple<User, string>(sender, message));
        }
    }
}
