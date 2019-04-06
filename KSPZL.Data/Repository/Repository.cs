using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using KSZPL.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace KSZPL.Data.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly KSZPLDbContext _context;

        public Repository(KSZPLDbContext context)
        {
            _context = context;
        }

        public T Add(T entity)
        {
            _context.Set<T>().Add(entity);
            _context.SaveChanges();

            return entity;
        }

        public async Task AddAsync(T entity, CancellationToken cancellationToken)
        {
            await _context.Set<T>().AddAsync(entity, cancellationToken);
            _context.SaveChanges();
        }

        public T Delete(T entity)
        {
            if (entity != null)
                _context.Set<T>().Remove(entity);
            _context.SaveChanges();

            return entity;
        }

        public IQueryable<T> GetAll()
        {
            return _context.Set<T>();
        }

        public IQueryable<T> Get(Expression<Func<T, bool>> expression)
        {
            return _context.Set<T>().Where(expression).AsQueryable();
        }

        public T GetById(object id)
        {
            return _context.Set<T>().Find(id);

        }

        public T Update(T entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            _context.Set<T>().Update(entity);
            _context.SaveChanges();

            return entity;
        }
    }
}
