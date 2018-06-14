using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ReserveerBackend.Models
{
    public class TemperatureSensor
    {
        public TemperatureSensor() { }
        public TemperatureSensor(string Token)
        {
            this.Token = Token;
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Token { get; set; }
        public List<Temperature> Temperatures { get; set; }
    }
}
