using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ReserveerBackend.Migrations
{
    public partial class FixingXUnitError : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserPasswordLogins_Users_UserId",
                table: "UserPasswordLogins");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "UserPasswordLogins",
                newName: "UserID");

            migrationBuilder.RenameIndex(
                name: "IX_UserPasswordLogins_UserId",
                table: "UserPasswordLogins",
                newName: "IX_UserPasswordLogins_UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_UserPasswordLogins_Users_UserID",
                table: "UserPasswordLogins",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserPasswordLogins_Users_UserID",
                table: "UserPasswordLogins");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "UserPasswordLogins",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserPasswordLogins_UserID",
                table: "UserPasswordLogins",
                newName: "IX_UserPasswordLogins_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserPasswordLogins_Users_UserId",
                table: "UserPasswordLogins",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
