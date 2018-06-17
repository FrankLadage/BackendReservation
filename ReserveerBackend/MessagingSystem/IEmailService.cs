﻿using ReserveerBackend.Models;
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
