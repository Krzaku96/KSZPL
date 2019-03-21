using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KSZPL.Data.Migrations
{
    public partial class othertables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PatientCards",
                columns: table => new
                {
                    Id = table.Column<decimal>(nullable: false),
                    IdPatient = table.Column<decimal>(nullable: false),
                    HistoryTreatment = table.Column<string>(nullable: true),
                    IdUser = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatientCards", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Patients",
                columns: table => new
                {
                    Id = table.Column<decimal>(nullable: false),
                    Imie = table.Column<string>(nullable: true),
                    Nazwisko = table.Column<string>(nullable: true),
                    DateRegister = table.Column<DateTime>(nullable: false),
                    Address = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    NIP = table.Column<decimal>(nullable: false),
                    PESEL = table.Column<decimal>(nullable: false),
                    DateBirth = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patients", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Recipes",
                columns: table => new
                {
                    Id = table.Column<decimal>(nullable: false),
                    IdPatientCard = table.Column<decimal>(nullable: false),
                    IdUser = table.Column<decimal>(nullable: false),
                    DateRelease = table.Column<DateTime>(nullable: false),
                    PrescribedMedicines = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recipes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Visits",
                columns: table => new
                {
                    Id = table.Column<decimal>(nullable: false),
                    Status = table.Column<string>(nullable: true),
                    IdPatient = table.Column<decimal>(nullable: false),
                    IdUser = table.Column<decimal>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Place = table.Column<string>(nullable: true),
                    DateVisit = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Visits", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PatientCards");

            migrationBuilder.DropTable(
                name: "Patients");

            migrationBuilder.DropTable(
                name: "Recipes");

            migrationBuilder.DropTable(
                name: "Visits");
        }
    }
}
