using ReserveerBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReserveerBackend.MessagingSystem
{
    public abstract class IEmailService
    {
        abstract public void SendNotification(User receiver, User sender, string message);
        public void SendReservationChangedMessage(User receiver, User sender, Reservation reservation, ReservationChange change)
        {
            SendNotification(receiver, sender, String.Format(
    @"The reservation '{0}' was changed.
New time: {1} - {2}
Old time: {3} - {4}",
            reservation.Description,
            reservation.StartDate.ToString(),
            reservation.EndDate.ToString(),
            change.OldStatDate.ToString(),
            change.OldEndDate.ToString()));
        }
    }
}
