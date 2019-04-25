using System;
using System.Threading;
using System.Threading.Tasks;
using KSZPL.Data.Models;
using KSZPL.Data.Repository;

namespace KSZPL.Data
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<Patient> PatientRepository { get; }
        void Save();
        Task SaveAsync(CancellationToken cancellationToken);
    }
}
