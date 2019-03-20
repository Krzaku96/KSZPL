using System.Threading;
using System.Threading.Tasks;
using KSZPL.Data.Context;

namespace KSZPL.Data
{
    class UnitOfWork : IUnitOfWork
    {
        private readonly KSZPLDbContext _context;
        
        public UnitOfWork(KSZPLDbContext context)
        {
            _context = context;
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        public async Task SaveAsync(CancellationToken cancellationToken)
        {
            await _context.SaveChangesAsync(cancellationToken);
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
