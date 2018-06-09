using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ReserveerBackend.Models
{
    public class Reservation
    {
        public Reservation() { }
        public Reservation(DateTime start, DateTime end, bool isactive, bool ismutable, string description, Room room)
        {
            this.StartDate = start;
            this.EndDate = end;
            this.Active = isactive;
            this.IsMutable = IsMutable;
            this.Description = description;
            this.Room = room;
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        public bool Active { get; set; }
        [Required]
        public bool IsMutable { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public Room Room { get; set; }

        public List<Report> Reports { get; set; }
        public List<Participant> Participants { get; set; }
        public List<ParticipantChange> ParticipantChanges { get; set; }

        public ReservationChange GenerateChangeCopy(User actor)
        {
            return new ReservationChange(Room, this, actor, StartDate, EndDate, Active, Description, DateTime.Now);
        }
    }
}
