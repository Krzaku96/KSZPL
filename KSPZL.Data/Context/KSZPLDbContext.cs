using Microsoft.EntityFrameworkCore;

namespace KSZPL.Data.Context
{
    public class KSZPLDbContext : DbContext
    {
        public KSZPLDbContext(DbContextOptions<KSZPLDbContext> options) : base(options) { }
    }
}
