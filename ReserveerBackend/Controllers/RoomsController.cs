using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReserveerBackend.Models;

namespace ReserveerBackend.Controllers
{
    [Produces("application/json")]
    [Route("api/Rooms")]
    public class RoomsController : Controller
    {
        ReserveerDBContext _context;
        public RoomsController(ReserveerDBContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("GetMatch")]
        public IEnumerable<Room> GetMatch(int? Id, string Name, string Location, int? MinCapacity, int? MaxCapacity, bool? TV, bool? Smartboard, int? MinPowersupply, int? MaxPowersupply)
        {
            var validrooms = _context.Rooms.AsQueryable();
            if (Id.HasValue)
                return validrooms.Where(x => x.Id == Id.Value); //only one match possible
            if (Name != null)
                validrooms = validrooms.Where(x => x.Name.Contains(Name));
            if(Location != null)
                validrooms = validrooms.Where(x => x.Location.Contains(Location));
            if (MinCapacity.HasValue)
                validrooms = validrooms.Where(x => x.Capacity >= MinCapacity.Value);
            if (MaxCapacity.HasValue)
                validrooms = validrooms.Where(x => x.Capacity <= MaxCapacity.Value);
            if (TV.HasValue)
                validrooms = validrooms.Where(x => x.TV == TV.Value);
            if (Smartboard.HasValue)
                validrooms = validrooms.Where(x => x.Smartboard == Smartboard.Value);
            if (MinPowersupply.HasValue)
                validrooms = validrooms.Where(x => x.Powersupply >= MinPowersupply.Value);
            if (MaxPowersupply.HasValue)
                validrooms = validrooms.Where(x => x.Powersupply <= MaxPowersupply.Value);
            //Console.WriteLine(validrooms.ToSql()); //see file "generated sql.txt" for the generated query
            return validrooms;
        }

        [HttpPost]
        [Route("Create")]
        [Authorize(Roles = Authorization.ServiceOrHigher)]
        public IActionResult CreateRoom(string name, string location, int capacity, bool TV, bool Smartboard, int Powersupply)
        {
            if (name == null)
                return BadRequest("Name cannot be null");
            if (location == null)
                return BadRequest("Location cannot be null");


            var room = new Room();
            room.Capacity = capacity;
            room.Location = location;
            room.Name = name;
            room.Powersupply = Powersupply;
            room.Smartboard = Smartboard;
            room.TV = TV;
            _context.Rooms.Add(room);
            _context.SaveChanges();
            return Ok(room.Id);
        }
    }
}