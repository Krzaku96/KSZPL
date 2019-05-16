using KSZPL.Core.Dtos;
using KSZPL.Core.Dtos.Patient;
using KSZPL.Core.Dtos.User;
using KSZPL.Core.Dtos.Visit;
using System;
using System.Collections.Generic;
using System.Text;
using KSZPL.Data.Models;

namespace KSZPL.Core.Interfaces
{
    public interface IVisitService
    {
        List<ShowVisitDto> VisitsForToday();
        IEnumerable<Visit> VisitsForDoctor(int doctorId);
        CreateVisitDto CreateModeltoCreateVisit();
        ShowVisitDto CreateModelToShowVisit(int id);
        GetEditVisitDto CreateModelToEditVisit(int id);
        int GetPatientCardId(int patientId);
        List<ShowVisitDto> CreateModelToListAllVisits();
        List<ShowVisitDto> CreateModelToFindVisit(int idPatient, int idDoctor, string dateVisitString);
    }
}
