using AutoMapper;
using KSZPL.Core.Interfaces;
using KSZPL.Data.Context;
using KSZPL.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KSZPL.Core.Services
{
    class VisitService : IVisitService
    {
        private readonly KSZPLDbContext _context;
        private readonly IMapper _mapper;

        public VisitService(KSZPLDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public Visit CreateVisit(Visit visit)
        {
            _context.Visits.Add(visit);
            _context.SaveChanges();

            return visit;
        }

        public Visit EditVisit(Visit visit)
        {
            _context.Visits.Update(visit);
            _context.SaveChanges();

            return visit;
        }

        public bool DeleteVisit(int id)
        {
            var visit = _context.Visits.FirstOrDefault(x => x.Id == id);

            if(visit == null)
            {
                return false; 
            }
            _context.Visits.Remove(visit);
            _context.SaveChanges();

            return true;
        }

        public IEnumerable<Visit> GetAllVisits()
        {
            var visits = _context.Visits;

            if (visits == null)
                return null;

            return visits;
        }

        public Visit GetVisit(int id)
        {
            return _context.Visits.Find(id);
        }


    }
}
