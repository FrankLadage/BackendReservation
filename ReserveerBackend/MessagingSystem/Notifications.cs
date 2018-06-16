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
    class Notifications
    {
        private static void SendNotification(User receiver, User sender, string message)
        {
            var fromAddress = "testreservering@gmail.com";
            var toAddress = receiver.Email;
            const string fromPassword = "test1234test";
            string subject = "Your reservation changed";
            string body = String.Format(message);
            var smtp = new SmtpClient();
            {
                smtp.Host = "smtp.gmail.com";
                smtp.Port = 587;
                smtp.EnableSsl = true;
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Credentials = new NetworkCredential(fromAddress, fromPassword);
            }

            //try
            //{
                smtp.Send(fromAddress, toAddress, subject, body);
            //}
            //catch
            //{
            //    
            //}
        }

        private static void SendReservationChangedMessage(User receiver, User sender, Reservation reservation, ReservationChange change)
        {
            SendNotification(receiver, sender, String.Format(
            @"The reservation from room '{0}' with description {1} was changed.
            From {2} untill {3}
            To: {4} untill {5}",
            reservation.Room,
            reservation.Description,
            reservation.StartDate.ToString(),
            reservation.EndDate.ToString(),
            change.OldStatDate.ToString(),
            change.OldEndDate.ToString()));
        }
    }
}