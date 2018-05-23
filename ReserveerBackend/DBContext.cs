﻿using Microsoft.EntityFrameworkCore;
using ReserveerBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReserveerBackend
{
    public class ReserveerDBContext : DbContext
    {
        public ReserveerDBContext(DbContextOptions<ReserveerDBContext> options) : base(options)
        {
            if (Program.Environment == Program.EnvironmentType.Testing) //if testing, delete testing database on startup for clean slate
            {
                Database.EnsureDeleted();
            }
            Database.Migrate();
            if(!(UserPasswordLogins.Where(x => x.Username == "Admin").Count() > 0)){ //check is a user Admin exists, if not, create it
                var user = new User();
                user.Email = "";
                user.EmailNotification = false;
                user.Role = Role.Admin;
                user.PasswordLogin = PasswordLoginUtilities.GenerateNewLogin("Admin", "Password");
                user.PasswordLogin.User = user;
                Users.Add(user);
                UserPasswordLogins.Add(user.PasswordLogin);
                SaveChanges();
            }
        }
        public DbSet<Participant> Participants { get; set; }
        public DbSet<ParticipantChange> ParticipantChanges { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<ReservationChange> ReservationChanges { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Temperature> Temperatures { get; set; }
        public DbSet<TemperatureSensor> TemperatureSensors { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserPasswordLogin> UserPasswordLogins { get; set; }
        public DbSet<Whiteboard> Whiteboards { get; set; }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Participant>().HasKey(x => new { x.UserID, x.ReservationID });
            modelBuilder.Entity<Participant>().HasOne(x => x.User).WithMany(x => x.Participants).HasForeignKey(x => x.UserID);
            modelBuilder.Entity<Participant>().HasOne(x => x.Reservation).WithMany(x => x.Participants).HasForeignKey(x => x.ReservationID);

            modelBuilder.Entity<ParticipantChange>().HasKey(x => new { x.UserID, x.ReservationID, x.ChangeDate });
            modelBuilder.Entity<ParticipantChange>().HasOne(x => x.User).WithMany(x => x.ParticipantChanges).HasForeignKey(x => x.UserID);
            modelBuilder.Entity<ParticipantChange>().HasOne(x => x.Reservation).WithMany(x => x.ParticipantChanges).HasForeignKey(x => x.ReservationID);
        }
    }
}
