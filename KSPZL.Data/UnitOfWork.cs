using System.Threading;
using System.Threading.Tasks;
using KSZPL.Data.Context;
using KSZPL.Data.Models;
using KSZPL.Data.Repository;

namespace KSZPL.Data
{
    class UnitOfWork : IUnitOfWork
    {
        private readonly KSZPLDbContext _context;
        private Repository<Patient> _patientRepository;

        public UnitOfWork(KSZPLDbContext context)
        {
            _context = context;
        }

        public IRepository<Patient> PatientRepository
        {
            get
            {
                if (this._patientRepository == null)
                {
                    this._patientRepository = new Repository<Patient>(_context);
                }
                return _patientRepository;
            }
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
