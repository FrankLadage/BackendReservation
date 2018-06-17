using ReserveerBackend.MessagingSystem;
using ReserveerBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReserveerBackend
{
    public class TestEmailService : IEmailService
    {
        public struct email
        {
            string title, body;
            User Sender;
            public email(User sender, string title, string body)
            {
                this.Sender = sender;
                this.title = title;
                this.body = body;
            }
        }
        Dictionary<User, List<email>> Messages = new Dictionary<User, List<email>>();
        
        public override void Send(User receiver, User sender, string message, string title)
        {
            if (!Messages.ContainsKey(receiver))
                Messages.Add(receiver, new List<email>());
            Messages[receiver].Add(new email(sender, title, message));
        }
    }
}
