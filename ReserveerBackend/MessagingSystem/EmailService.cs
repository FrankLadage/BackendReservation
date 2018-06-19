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
        readonly string fromAddress, password;
        public EmailService(string emaillogin, string password)
        {
            fromAddress = emaillogin;
            this.password = password;
        }

        /// <summary>
        /// Sends the email from the emailserver
        /// </summary>
        /// <param name="receiver"></param>
        /// <param name="sender"></param>
        /// <param name="message"></param>
        /// <param name="title"></param>
        public override void Send(User receiver, User sender, string message, string title)
        {
            var toAddress = receiver.Email;
            var smtp = new SmtpClient();
            {
                smtp.Host = "smtp.gmail.com";
                smtp.Port = 587;
                smtp.EnableSsl = true;
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Credentials = new NetworkCredential(fromAddress, password);
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