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
        /// <summary>
        /// A struct representing an email for internal use in this class.
        /// </summary>
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
        
        /// <summary>
        /// Saves the send email in a dictionairy
        /// </summary>
        /// <param name="receiver"></param>
        /// <param name="sender"></param>
        /// <param name="message"></param>
        /// <param name="title"></param>
        public override void Send(User receiver, User sender, string message, string title)
        {
            if (!Messages.ContainsKey(receiver))
                Messages.Add(receiver, new List<email>());
            Messages[receiver].Add(new email(sender, title, message));
        }
    }
}
