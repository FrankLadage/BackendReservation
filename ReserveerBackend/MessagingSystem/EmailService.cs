using ReserveerBackend.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace ReserveerBackend.MessagingSystem
{
    class EmailService : IEmailService
    {
        public override void Send(User receiver, User sender, string message, string title)
        {
            const string fromAddress = "testreservering@gmail.com";
            var toAddress = receiver.Email;
            const string fromPassword = "test1234test";
            var smtp = new SmtpClient();
            {
                smtp.Host = "smtp.gmail.com";
                smtp.Port = 587;
                smtp.EnableSsl = true;
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Credentials = new NetworkCredential(fromAddress, fromPassword);
            }

            try
            {
                smtp.Send(fromAddress, toAddress, title, message);
            }
            catch(Exception e)
            {
                Console.WriteLine("Could not send email, error was raised.");
                Console.WriteLine(e);
            }
        }
    }
}