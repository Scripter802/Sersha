using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Slies : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Slides",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Level = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Place = table.Column<int>(nullable: false),
                    FilePath = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Slides", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Slides");
        }
    }
}
