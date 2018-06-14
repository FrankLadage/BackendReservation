﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using ReserveerBackend;
using ReserveerBackend.Models;
using System;

namespace ReserveerBackend.Migrations
{
    [DbContext(typeof(ReserveerDBContext))]
    [Migration("20180429130641_FixPKErrors")]
    partial class FixPKErrors
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.0.2-rtm-10011");

            modelBuilder.Entity("ReserveerBackend.Models.Participant", b =>
                {
                    b.Property<string>("shadowid")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("IsOwner");

                    b.Property<int>("ReservationId");

                    b.Property<int>("UserId");

                    b.HasKey("shadowid");

                    b.HasIndex("ReservationId");

                    b.HasIndex("UserId");

                    b.ToTable("Participants");
                });

            modelBuilder.Entity("ReserveerBackend.Models.ParticipantChange", b =>
                {
                    b.Property<int>("shadowid")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("ChangeDate");

                    b.Property<bool>("OldIsOwner");

                    b.Property<int>("ReservationId");

                    b.Property<int>("UserId");

                    b.HasKey("shadowid");

                    b.HasIndex("ReservationId");

                    b.HasIndex("UserId");

                    b.ToTable("ParticipantChanges");
                });

            modelBuilder.Entity("ReserveerBackend.Models.Report", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ActionStatus");

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<DateTime>("RequestedEndTime");

                    b.Property<int?>("ReservationId");

                    b.Property<int>("RoomId");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("ReservationId");

                    b.HasIndex("RoomId");

                    b.HasIndex("UserId");

                    b.ToTable("Reports");
                });

            modelBuilder.Entity("ReserveerBackend.Models.Reservation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Active");

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<DateTime>("EndDate");

                    b.Property<bool>("IsMutable");

                    b.Property<int>("RoomId");

                    b.Property<DateTime>("StartDate");

                    b.HasKey("Id");

                    b.HasIndex("RoomId");

                    b.ToTable("Reservations");
                });

            modelBuilder.Entity("ReserveerBackend.Models.ReservationChange", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("ChangeDate");

                    b.Property<bool>("OldActive");

                    b.Property<DateTime>("OldEndDate");

                    b.Property<DateTime>("OldStatDate");

                    b.Property<int>("ReservationId");

                    b.Property<int>("RoomId");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("ReservationId");

                    b.HasIndex("RoomId");

                    b.HasIndex("UserId");

                    b.ToTable("ReservationChanges");
                });

            modelBuilder.Entity("ReserveerBackend.Models.Room", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Capacity");

                    b.Property<string>("Location")
                        .IsRequired();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<int>("Powersupply");

                    b.Property<bool>("Smartboard");

                    b.Property<bool>("TV");

                    b.HasKey("Id");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("ReserveerBackend.Models.Temperature", b =>
                {
                    b.Property<DateTime>("DateTime");

                    b.Property<int>("RoomId");

                    b.Property<int?>("SensorId");

                    b.Property<float>("temperature");

                    b.HasKey("DateTime");

                    b.HasIndex("RoomId");

                    b.HasIndex("SensorId");

                    b.ToTable("Temperatures");
                });

            modelBuilder.Entity("ReserveerBackend.Models.TemperatureSensor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.HasKey("Id");

                    b.ToTable("TemperatureSensors");
                });

            modelBuilder.Entity("ReserveerBackend.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<bool>("EmailNotification");

                    b.Property<string>("PasswordLoginUsername");

                    b.Property<int>("Role");

                    b.HasKey("Id");

                    b.HasIndex("PasswordLoginUsername");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ReserveerBackend.Models.UserPasswordLogin", b =>
                {
                    b.Property<string>("Username")
                        .ValueGeneratedOnAdd();

                    b.Property<byte[]>("HashedPassword")
                        .IsRequired();

                    b.Property<byte[]>("Salt")
                        .IsRequired();

                    b.HasKey("Username");

                    b.ToTable("GetUserPasswordLogins");
                });

            modelBuilder.Entity("ReserveerBackend.Models.Whiteboard", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("RoomId");

                    b.HasKey("Id");

                    b.HasIndex("RoomId");

                    b.ToTable("Whiteboards");
                });

            modelBuilder.Entity("ReserveerBackend.Models.Participant", b =>
                {
                    b.HasOne("ReserveerBackend.Models.Reservation", "Reservation")
                        .WithMany()
                        .HasForeignKey("ReservationId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ReserveerBackend.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ReserveerBackend.Models.ParticipantChange", b =>
                {
                    b.HasOne("ReserveerBackend.Models.Reservation", "Reservation")
                        .WithMany()
                        .HasForeignKey("ReservationId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ReserveerBackend.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ReserveerBackend.Models.Report", b =>
                {
                    b.HasOne("ReserveerBackend.Models.Reservation", "Reservation")
                        .WithMany("Reports")
                        .HasForeignKey("ReservationId");

                    b.HasOne("ReserveerBackend.Models.Room", "Room")
                        .WithMany("Reports")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ReserveerBackend.Models.User", "User")
                        .WithMany("Reports")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ReserveerBackend.Models.Reservation", b =>
                {
                    b.HasOne("ReserveerBackend.Models.Room", "Room")
                        .WithMany("Reservations")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ReserveerBackend.Models.ReservationChange", b =>
                {
                    b.HasOne("ReserveerBackend.Models.Reservation", "Reservation")
                        .WithMany()
                        .HasForeignKey("ReservationId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ReserveerBackend.Models.Room", "Room")
                        .WithMany()
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ReserveerBackend.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ReserveerBackend.Models.Temperature", b =>
                {
                    b.HasOne("ReserveerBackend.Models.Room", "Room")
                        .WithMany("Temperatures")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ReserveerBackend.Models.TemperatureSensor", "Sensor")
                        .WithMany("Temperatures")
                        .HasForeignKey("SensorId");
                });

            modelBuilder.Entity("ReserveerBackend.Models.User", b =>
                {
                    b.HasOne("ReserveerBackend.Models.UserPasswordLogin", "PasswordLogin")
                        .WithMany()
                        .HasForeignKey("PasswordLoginUsername");
                });

            modelBuilder.Entity("ReserveerBackend.Models.Whiteboard", b =>
                {
                    b.HasOne("ReserveerBackend.Models.Room", "Room")
                        .WithMany("Whiteboards")
                        .HasForeignKey("RoomId");
                });
#pragma warning restore 612, 618
        }
    }
}
