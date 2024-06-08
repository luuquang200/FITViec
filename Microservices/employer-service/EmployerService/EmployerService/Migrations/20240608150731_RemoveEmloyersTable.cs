using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployerService.Migrations
{
    public partial class RemoveEmloyersTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Companies_Employers_EmployerId",
                table: "Companies");

            migrationBuilder.DropTable(
                name: "Employers");

            migrationBuilder.DropIndex(
                name: "IX_Companies_EmployerId",
                table: "Companies");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employers",
                columns: table => new
                {
                    EmployerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employers", x => x.EmployerId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Companies_EmployerId",
                table: "Companies",
                column: "EmployerId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Companies_Employers_EmployerId",
                table: "Companies",
                column: "EmployerId",
                principalTable: "Employers",
                principalColumn: "EmployerId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
