using KSZPL.Core.Dtos.PatientCard;
using KSZPL.Core.Dtos.Visit;
using System;
using System.Collections.Generic;
using System.Text;

namespace KSZPL.Core.Interfaces
{
    public interface IPatientCardService
    {
        List<ShowPatientCardDto> CreateModelToListAllPatientCards();
        List<VisitDto> GetHistoryOfTreatmentPatient(int idPatientCard);
    }
}
