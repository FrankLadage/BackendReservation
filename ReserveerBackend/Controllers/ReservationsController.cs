using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ReserveerBackend;
using ReserveerBackend.MessagingSystem;
using ReserveerBackend.Models;

namespace ReserveerBackend.Controllers
{
    [Produces("application/json")]
    [Route("api/Reservations")]
    [Authorize(Roles = Authorization.StudentOrHigher)]
    public class ReservationsController : Controller
    {
        private readonly ReserveerDBContext _context;
        //private readonly object ReservationLock = new object();

        public ReservationsController(ReserveerDBContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("get")]
        public IEnumerable<Reservation> GetMatch(int? Id, bool? isactive, bool? ismutable, string description, int? roomID, DateTime? after, DateTime? before)
        {
            var validReservations = _context.Reservations.AsQueryable();
            if (Id.HasValue)
                return validReservations.Where(x => x.Id == Id.Value); //only one match possible
            if (isactive.HasValue)
                validReservations = validReservations.Where(x => x.Active == isactive.Value);
            if (ismutable.HasValue)
                validReservations = validReservations.Where(x => x.IsMutable == ismutable.Value);
            if (description != null)
                validReservations = validReservations.Where(x => x.Description.Contains(description));
            if (roomID.HasValue)
                validReservations = validReservations.Where(x => x.Room.Id == roomID);
            if (after.HasValue)
                validReservations = validReservations.Where(x => x.EndDate >= after.Value);
            if (before.HasValue)
                validReservations = validReservations.Where(x => x.StartDate <= before.Value);
            return validReservations;
        }

        [HttpPost]
        [Route("Participants/Add")]
        public IActionResult AddParticipants([FromServices] IEmailService emailservice, List<int> userAsOwner, List<int> userAsParticipant, int reservationid)
        {
            if (userAsParticipant == null)
                userAsParticipant = new List<int>();
            if (userAsOwner == null)
                userAsOwner = new List<int>();

            var UserIds = new List<Tuple<int, bool>>();
            foreach (var item in userAsOwner)
                UserIds.Add(new Tuple<int, bool>(item, true));
            foreach (var item in userAsParticipant)
                UserIds.Add(new Tuple<int, bool>(item, false));

            //Check if user is owner or service desk member or higher
            var owner = Models.User.FromClaims(User.Claims, _context);
            var _reservation = _context.Reservations.Where(x => x.Id == reservationid).Include(x=>x.Participants).Include(x=>x.ParticipantChanges);
            if(_reservation.Count() != 1)
            {
                return BadRequest("Could not find reservation");
            }
            var reservation = _reservation.First();
            if (!Authorization.AIsBOrHigher(owner.Role, Role.ServiceDesk))
            {
                if (reservation.Participants.Where(x => x.UserID == owner.Id).Where(x => x.IsOwner).Count() != 1)
                {
                    return Unauthorized();
                }
            }

            var users = from id in UserIds select new Tuple<User, bool>(_context.Users.Where(x => x.Id == id.Item1).FirstOrDefault(), id.Item2);
            if(!users.All(x => x.Item1 != null))
            {
                return BadRequest("A user could not be found");
            }

            foreach (var user in users)
            {
                InviteUser(emailservice, owner, user.Item1, user.Item2, reservation);
            }
            return Ok("Succesfull added or updated users");
        }

        [HttpDelete]
        [Route("Participants/Remove")]
        public IActionResult RemoveParticipants([FromServices] IEmailService emailservice, List<int> UserIds, int reservationid)
        {
            var owner = Models.User.FromClaims(User.Claims, _context);
            var _reservation = _context.Reservations.Where(x => x.Id == reservationid).Include(x => x.Participants).Include(x => x.ParticipantChanges);
            if (_reservation.Count() != 1)
            {
                return BadRequest("Could not find reservation");
            }
            var reservation = _reservation.First();
            if (reservation.Participants.Where(x => x.UserID == owner.Id).Where(x => x.IsOwner).Count() != 1 || Authorization.AIsBOrHigher(owner.Role, Role.ServiceDesk))
            {
                return Unauthorized();
            }

            if (UserIds == null)
            {
                return BadRequest("UserId's cannot be empty");
            }
            var users = from id in UserIds select _context.Users.Where(x => x.Id == id).FirstOrDefault();
            if (!users.All(x => x != null))
            {
                return BadRequest("A user could not be found");
            }

            foreach (var user in users)
            {
                RemoveUser(emailservice, owner, user, reservation);
            }
            _context.SaveChanges();
            return Ok(users.ToList());
        }

        private void InviteUser(IEmailService emailservice, User actor, User target, bool asOwner, Reservation reservation)
        {
            Debug.WriteLine("Should have invited user, but added as participant instead. Please fix 'InviteUser' in 'ReservationController.cs' if the messaging and invitation system is implemented.");
            var participant = reservation.Participants.Find(x => x.UserID == target.Id);
            if (participant == null)
            {
                reservation.Participants.Add(new Participant(reservation, target, asOwner, DateTime.Now));
                _context.SaveChanges();
                emailservice.AddedAsParticipant(target, actor, reservation, _context);
                return;
            }
            else
            {
                var participantchange = participant.GenerateChangeCopy(DateTime.Now);
                participant.IsOwner = asOwner;
                _context.ParticipantChanges.Add(participantchange);
                _context.Participants.Add(participant);
                _context.SaveChanges();
                emailservice.AddedAsParticipant(target, actor, reservation, _context);
                return;
            }
        }

        private void RemoveUser(IEmailService emailservice, User actor, User target, Reservation reservation)
        {
            Debug.WriteLine("Should have messaged user, but removed as participant instead. Please fix 'RemoveUser' in 'ReservationController.cs' if the messaging system is implemented.");
            var participant = reservation.Participants.Find(x => x.UserID == target.Id);
            if (participant == null)//user is not a participant
                return;
            _context.ParticipantChanges.Add(participant.GenerateChangeCopy(DateTime.Now));
            reservation.Participants.Remove(participant);
            _context.SaveChanges();
            emailservice.RemovedAsParticipant(target, actor, reservation, _context);
        }

        private bool CanEditReservation(Reservation reservation, User actor)
        {
            if (reservation.Participants.Where(x => x.IsOwner).Where(x => x.UserID == actor.Id).Count() != 1)
            {
                if (!Authorization.AIsBOrHigher(actor.Role, Role.ServiceDesk))
                {
                    return false;
                }
            }
            return true;
        }

        [HttpPost]
        [Route("Change")]
        public IActionResult ChangeReservation([FromServices] IEmailService emailservice, int ReservationID, DateTime? StartTime, DateTime? EndTime, string Description, int? RoomID, bool? isactive, bool Force = false)
        {
            User actor = Models.User.FromClaims(User.Claims, _context);
            Room room = null;
            if (RoomID.HasValue)
            {
                var rooms = _context.Rooms.Where(x => x.Id == RoomID.Value);
                if (!rooms.Any())
                {
                    return BadRequest("RoomID could not be found");
                }
                room = rooms.First();
            }
            lock (_context.ReservationLock)
            {
                var _reservation = _context.Reservations.Where(x => x.Id == ReservationID).Include(x => x.Participants).Include(x => x.Room);
                Reservation reservation = null;
                if(_reservation.Count() == 0)
                {
                    return BadRequest("Reservation could not be found");
                }
                reservation = _reservation.First();
                if (room == null)
                    room = reservation.Room;

                if(reservation.Participants.Where(x => x.IsOwner).Where(x => x.UserID == actor.Id).Count() != 1)
                {
                    if(!Authorization.AIsBOrHigher(actor.Role, Role.ServiceDesk))
                    {
                        return Unauthorized();
                    }
                }

                var reservationchange = reservation.GenerateChangeCopy(actor);

                DateTime start;
                if (StartTime.HasValue)
                    start = StartTime.Value;
                else
                    start = reservation.StartDate;
                DateTime end;
                if (EndTime.HasValue)
                    end = EndTime.Value;
                else
                    end = reservation.EndDate;

                if(start > end)
                {
                    return BadRequest("Startdate cannot come before end date");
                }

                var intersections = FindIntersections(start, end, room);
                if (intersections.Count() <= 0)
                {
                    return _ChangeReservation(emailservice, actor, isactive, reservation, start, end, room, Description, reservationchange);
                }
                else if(intersections.Count() == 1 && intersections.First() == reservation)
                {
                    return _ChangeReservation(emailservice, actor, isactive, reservation, start, end, room, Description, reservationchange);
                }
                else
                {
                    intersections = intersections.Where(x => x.Id != reservation.Id); //remove self
                    if (!Force)
                    {
                        return new ObjectResult("Conflict: There is overlap with existing reservations, please set 'Force' to true in your request if you wish to forcibly insert it.")
                        {
                            StatusCode = 409
                        };
                    }
                    if (Authorization.AIsBOrHigher(actor.Role, Role.ServiceDesk)) //service desk or higher can always forcibly change reservations
                    {
                        return _ForceChangeReservation(emailservice, isactive, reservation, start, end, room, Description, reservationchange, actor, intersections);
                    }
                    var isOwnerOfIntersections = intersections.Select(x => x.Participants.Select(z => z.UserID).Contains(actor.Id)).All(x => x);
                    var _intersectionowners = (from x in intersections select x.Participants).SelectMany(x => x).Where(x => x.IsOwner).Select(x => x.UserID);
                    var _intersectionownerLevels = (from x in _intersectionowners select _context.Users.Where(z => z.Id == x).First().Role);
                    if (isOwnerOfIntersections || _intersectionownerLevels.All(x => Authorization.AIsHigherThanB(actor.Role, x))) //intersections with reservation from people of higher or equal level
                    {
                        return _ForceChangeReservation(emailservice, isactive, reservation, start, end, room, Description, reservationchange, actor, intersections); //intersections with reservations from people with lower level
                    }
                    return Unauthorized();
                }
            }
        }

        [HttpPost]
        [Route("Add")]
        public IActionResult AddReservation([FromServices] IEmailService emailservice, DateTime StartTime, DateTime EndTime, string Description, int RoomID, bool Force = false)
        {
            if (StartTime == null || EndTime == null || Description == null)
            {
                return BadRequest("Fields missing");
            }
            if (StartTime > EndTime)
            {
                return BadRequest("StartTime is before EndTime");
            }
            var rooms = _context.Rooms.Where(x => x.Id == RoomID);
            if (!rooms.Any())
            {
                return BadRequest("Room does not exist");
            }
            var room = rooms.First();
            var Owner = Models.User.FromClaims(User.Claims, _context);

            lock (_context.ReservationLock) //lock all intersection checking and reservation writing logic to prevent changes to the database during the checking phase
            {
                var intersections = FindIntersections(StartTime, EndTime, room);
                if (intersections.Count() == 0) //No intersections with other reservations, add it
                {
                    return Ok(createreservation(StartTime, EndTime, Description, Owner, room).ToString());
                }
                if (!intersections.All(x => x.IsMutable == true)) //intersection with an immutable reservation
                {
                    return new ObjectResult("Conflict: Overlaps with an immutable reservation.")
                    {
                        StatusCode = 409
                    };
                }
                if (!Force)
                {
                    return new ObjectResult("Conflict: There is overlap with existing reservations, please set 'Force' to true in your request if you wish to forcibly insert it.")
                    {
                        StatusCode = 409
                    };
                }
                if (Authorization.AIsBOrHigher(Owner.Role, Role.ServiceDesk)) //service desk or higher can always forcibly add reservations
                {
                    return Ok(OverrideAddReservation(emailservice, intersections, StartTime, EndTime, Description, Owner, room).ToString());
                }
                var _intersectionowners = (from x in intersections select x.Participants).SelectMany(x => x).Where(x => x.IsOwner).Select(x => x.UserID);
                var _intersectionownerLevels = (from x in _intersectionowners select _context.Users.Where(z => z.Id == x).First().Role);
                if (!_intersectionownerLevels.All(x => Authorization.AIsHigherThanB(Owner.Role, x))) //intersections with reservation from people of higher or equal level
                {
                    return new ObjectResult("Conflict: Overlaps with a reservation with owner of equal or higher level.")
                    {
                        StatusCode = 409
                    };
                }
                return Ok(OverrideAddReservation(emailservice, intersections, StartTime, EndTime, Description, Owner, room).ToString()); //intersections with reservations from people with lower level
            }
        }

        private IActionResult _ForceChangeReservation([FromServices] IEmailService emailservice, bool? isactive, Reservation reservation, DateTime start, DateTime end, Room room, string Description, ReservationChange reservationchange, User actor, IEnumerable<Reservation> Intersections)
        {
            if (!Intersections.All(x => x.IsMutable))
            {
                throw new Exception("Cannot forcibly override immutable reservation");
            }
            foreach (var intersection in Intersections)
            {
                ShortenOtherReservation(emailservice, start, end, intersection, actor);
            }
            return _ChangeReservation(emailservice, actor, isactive, reservation, start, end, room, Description, reservationchange);
        }

        private IActionResult _ChangeReservation(IEmailService emailservice, User Actor, bool? isactive, Reservation reservation, DateTime start, DateTime end, Room room, string Description, ReservationChange reservationchange)
        {
            if (isactive.HasValue)
                reservation.Active = isactive.Value;
            reservation.StartDate = start;
            reservation.EndDate = end;
            if (room != null)
                reservation.Room = room;
            if (Description != null)
                reservation.Description = Description;
            _context.ReservationChanges.Add(reservationchange);
            _context.SaveChanges();

            foreach (var user in _context.Reservations.Where(x => x.Id == reservation.Id).Include(x => x.Participants).First().Participants.Where(x => x.User.EmailNotification))
            {
                emailservice.SendReservationChangedMessage(user.User, Actor, reservation, reservationchange, _context);
            }

            return Ok("Succesfully changed reservation");
        }

        private int OverrideAddReservation([FromServices] IEmailService emailservice, IEnumerable<Reservation> Intersections, DateTime StartTime, DateTime EndTime, string Description, User Owner, Room Room, bool IsMutable = true)
        {
            if(!Intersections.All(x => x.IsMutable))
            {
                throw new Exception("Cannot forcibly override immutable reservation");
            }
            foreach (var intersection in Intersections)
            {
                ShortenOtherReservation(emailservice, StartTime, EndTime, intersection, Owner);
            }
            var reservationid = createreservation(StartTime, EndTime, Description, Owner, Room);
            _context.SaveChanges();
            
            return reservationid;
        }

        private void ShortenOtherReservation([FromServices] IEmailService emailservice, DateTime StartTime, DateTime EndTime, Reservation OtherReservation, User actor)
        {
            var oldreservation = OtherReservation.GenerateChangeCopy(actor);
            if(OtherReservation.EndDate > StartTime && OtherReservation.StartDate < StartTime)
                OtherReservation.EndDate = StartTime;
            if (OtherReservation.StartDate < EndTime && OtherReservation.EndDate > EndTime)
                OtherReservation.StartDate = EndTime;

            _context.ReservationChanges.Add(oldreservation);

            foreach (var participant in OtherReservation.Participants)
            {
                if(participant.User.EmailNotification)
                    emailservice.SendReservationChangedMessage(participant.User, actor, OtherReservation, oldreservation, _context);
            }
        }

        private int createreservation(DateTime StartTime, DateTime EndTime, string Description, User Owner, Room Room, bool IsMutable = true)
        {
            var reservation = new Reservation();
            reservation.Active = true;
            reservation.Description = Description;
            reservation.StartDate = StartTime;
            reservation.EndDate = EndTime;
            reservation.IsMutable = IsMutable;
            reservation.Room = Room;
            _context.Reservations.Add(reservation);

            _context.Participants.Add(new Participant(reservation, Owner, true, DateTime.Now));

            _context.SaveChanges();
            return reservation.Id;
        }

        private IEnumerable<Reservation> FindIntersections(DateTime StartTime, DateTime EndTime, Room room)
        {
            if (room == null)
                throw new ArgumentNullException("Room cannot be null, need a room to search for intersections");
            if (StartTime > EndTime)
                throw new Exception("Starttime is later than endtime");
            return _context.Reservations.AsQueryable().Where(x => x.Room == room).Where(x => !(x.StartDate >= EndTime || x.EndDate <= StartTime)).Include(x => x.Participants);
        }
    }
}
