﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using ReserveerBackend;
using System;

namespace ReserveerBackend.Migrations
{
    [DbContext(typeof(ReserveerDBContext))]
    [Migration("20180424105949_FixedRoomStructure")]
    partial class FixedRoomStructure
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.0.2-rtm-10011");

            modelBuilder.Entity("ReserveerBackend.Models.Item", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Functional");

                    b.Property<string>("ItemName");

                    b.HasKey("Id");

                    b.ToTable("Item");
                });

            modelBuilder.Entity("ReserveerBackend.Models.Reservation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Active");

                    b.Property<DateTime>("EndDate");

                    b.Property<int?>("RoomId");

                    b.Property<DateTime>("StartDate");

                    b.Property<int?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("RoomId");

                    b.HasIndex("UserId");

                    b.ToTable("Reservation");
                });

            modelBuilder.Entity("ReserveerBackend.Models.Room", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Capacity");

                    b.Property<string>("Location");

                    b.Property<string>("Name");

                    b.Property<int>("Powersupply");

                    b.Property<bool>("Smartboard");

                    b.Property<bool>("TV");

                    b.HasKey("Id");

                    b.ToTable("Room");
                });

            modelBuilder.Entity("ReserveerBackend.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<bool>("EmailNotification");

                    b.Property<int?>("ReservationId");

                    b.Property<string>("Role");

                    b.HasKey("Id");

                    b.HasIndex("ReservationId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("ReserveerBackend.Models.Reservation", b =>
                {
                    b.HasOne("ReserveerBackend.Models.Room", "Room")
                        .WithMany()
                        .HasForeignKey("RoomId");

                    b.HasOne("ReserveerBackend.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("ReserveerBackend.Models.User", b =>
                {
                    b.HasOne("ReserveerBackend.Models.Reservation")
                        .WithMany("Users")
                        .HasForeignKey("ReservationId");
                });
#pragma warning restore 612, 618
        }
    }
}
