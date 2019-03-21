using KSZPL.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace KSZPL.Data.Context
{
    public class KSZPLDbContext : DbContext
    {
        public KSZPLDbContext(DbContextOptions<KSZPLDbContext> options) : base(options) { }

        public virtual DbSet<User> Users { get; set; }

        public virtual DbSet<Patient> Patients { get; set; }

        public virtual DbSet<PatientCard> PatientCards { get; set; }

        public virtual DbSet<Recipe> Recipes { get; set; }

        public virtual DbSet<Visit> Visits { get; set; }
    }
}
