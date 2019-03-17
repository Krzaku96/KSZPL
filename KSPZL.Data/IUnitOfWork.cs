using System;
using System.Threading;
using System.Threading.Tasks;

namespace KSZPL.Data
{
    public interface IUnitOfWork : IDisposable
    {
        void Save();
        Task SaveAsync(CancellationToken cancellationToken);
    }
}
