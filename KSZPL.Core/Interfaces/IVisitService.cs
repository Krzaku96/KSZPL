using KSZPL.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace KSZPL.Core.Interfaces
{
    public interface IVisitService
    {
        Visit CreateVisit(Visit visit);
        Visit EditVisit(Visit visit);
        bool DeleteVisit(int id);
        IEnumerable<Visit> GetAllVisits();
        Visit GetVisit(int id);
    }
}
