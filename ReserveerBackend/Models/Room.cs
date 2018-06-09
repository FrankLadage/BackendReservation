using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ReserveerBackend.Models
{
    public class Room
    {
        public Room(string name, string location, int capacity, bool tv, bool smartboard, int powersupply)
        {
            this.Name = name;
            this.Location = location;
            this.Capacity = capacity;
            this.TV = tv;
            this.Smartboard = smartboard;
            this.Powersupply = powersupply;
        }

        public Room() { }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Location { get; set; }
        [Required]
        public int Capacity { get; set; }
        [Required]
        public bool TV { get; set; }
        [Required]
        public bool Smartboard { get; set; }
        [Required]
        public int Powersupply { get; set; }

        public List<Reservation> Reservations { get; set; }
        public List<Report> Reports { get; set; }
        public List<Temperature> Temperatures { get; set; }
        public List<Whiteboard> Whiteboards { get; set; }
    }
}
