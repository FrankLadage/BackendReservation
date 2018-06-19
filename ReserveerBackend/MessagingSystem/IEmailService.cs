using Microsoft.EntityFrameworkCore;
using ReserveerBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReserveerBackend.MessagingSystem
{
    public abstract class IEmailService
    {
        abstract public void Send(User receiver, User sender, string message, string title);
        /// <summary>
        /// Formats the notification message by adding a userID and optional username
        /// </summary>
        /// <param name="receiver"></param>
        /// <param name="sender"></param>
        /// <param name="message"></param>
        /// <param name="title"></param>
        /// <param name="_context"></param>
        public void FormatNotificationMessage(User receiver, User sender, string message, string title, ReserveerDBContext _context)
        {
            string senderinfo = $"ID: {sender.Id}";
            var userpassword = _context.UserPasswordLogins.Where(x => x.UserID == sender.Id);
            if(userpassword.Count() == 1)
                senderinfo += $"\nUsername:{userpassword.First().Username}";
            string body = message + $"\n\nAction taken by user:\n{senderinfo}";
            Send(receiver, sender, body, title);
        }
        /// <summary>
        /// Send a notification that reservation had changed.
        /// </summary>
        /// <param name="receiver"></param>
        /// <param name="sender"></param>
        /// <param name="reservation"></param>
        /// <param name="change"></param>
        /// <param name="_context"></param>
        public void SendReservationChangedMessage(User receiver, User sender, Reservation reservation, ReservationChange change, ReserveerDBContext _context)
        {
            FormatNotificationMessage(receiver, sender, String.Format(
            @"The reservation from room '{0}' with description {1} was changed.
            From {2} untill {3}
            To: {4} untill {5}",
            reservation.Room.Name,
            reservation.Description,
            reservation.StartDate.ToString(),
            reservation.EndDate.ToString(),
            change.OldStatDate.ToString(),
            change.OldEndDate.ToString()),
            "Your reservation was changed.",
            _context);
        }
        /// <summary>
        /// Send a notification that a user was added as a participant
        /// </summary>
        /// <param name="target"></param>
        /// <param name="Actor"></param>
        /// <param name="reservation"></param>
        /// <param name="_context"></param>
        public void AddedAsParticipant(User target, User Actor, Reservation reservation, ReserveerDBContext _context)
        {
            FormatNotificationMessage(target, Actor, $"You have been added as a participant in a reservation:\nDescription: {reservation.Description}\nFrom {reservation.StartDate.ToString()} untill {reservation.EndDate.ToString()}",
                "You were added as a participant", _context);
        }
        /// <summary>
        /// Send a notification that a user was removed as a participant.
        /// </summary>
        /// <param name="target"></param>
        /// <param name="Actor"></param>
        /// <param name="reservation"></param>
        /// <param name="_context"></param>
        public void RemovedAsParticipant(User target, User Actor, Reservation reservation, ReserveerDBContext _context)
        {
            FormatNotificationMessage(target, Actor, $"You have been removed as a participant from a reservation:\nDescription: {reservation.Description}\nFrom {reservation.StartDate.ToString()} untill {reservation.EndDate.ToString()}",
                "You were removed as a participant", _context);
        }
    }
}
