using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReserveerBackend.Models;

namespace ReserveerBackend.Controllers
{
    [Produces("application/json")]
    [Route("api/Temperature")]
    public class TemperatureController : Controller
    {
        ReserveerDBContext _context;
        public TemperatureController(ReserveerDBContext context)
        {
            _context = context;
        }
        [HttpPost]
        public IActionResult PostTemperature(float value, int sensorID, int roomid)
        {
            var sensor = _context.TemperatureSensors.Where(x => x.Id == sensorID).FirstOrDefault();
            if(sensor == null)
            {
                return BadRequest("Sensor ID is not valid");
            }
            var room = _context.Rooms.Where(x => x.Id == roomid).FirstOrDefault();
            if(room == null)
            {
                return BadRequest("RoomID is not a valid room");
            }
            _context.Temperatures.Add(new Models.Temperature(sensor, value, room, DateTime.Now));
            _context.SaveChanges();
            return Ok("Succesfully added temperature");
        }
        [HttpGet]
        public IEnumerable<Temperature> AllTemperatures()
        {
            return _context.Temperatures.Where(x => true);
        }
        [HttpGet]
        [Route("Sensors")]
        public IEnumerable<TemperatureSensor> AllSensors()
        {
            return _context.TemperatureSensors.Include(x => x.Temperatures).Where(x => true);
        }
        [HttpGet]
        [Route("Rooms")]
        public IEnumerable<Room> AllRooms()
        {
            return _context.Rooms.Where(x => true);
        }
        [HttpPost]
        [Route("Sensors/new")]
        public int MakeNewRoom()
        {
            var i = new TemperatureSensor();
            _context.Add(i);
            _context.SaveChanges();
            return i.Id;
        }
    }
}