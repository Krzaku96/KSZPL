using KSZPL.Core.Dtos;
using KSZPL.Core.Dtos.Patient;
using KSZPL.Core.Dtos.User;
using KSZPL.Core.Dtos.Visit;
using System;
using System.Collections.Generic;
using System.Text;

namespace KSZPL.Core.Interfaces
{
    public interface IVisitService
    {
        CreateVisitDto CreateModeltoCreateVisit();
        ShowVisitDto CreateModelToShowVisit(int id);
        GetEditVisitDto CreateModelToEditVisit(int id);
        int GetPatientCardId(int patientId);
    }
}
