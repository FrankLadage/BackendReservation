using ReserveerBackend.MessagingSystem;
using ReserveerBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReserveerBackend
{
    public class EmptyEmailService : IEmailService
    {
        public override void SendNotification(User receiver, User sender, string message)
        {
            Console.WriteLine("Should have send email with service");
            Console.WriteLine(message);
        }
    }
}
