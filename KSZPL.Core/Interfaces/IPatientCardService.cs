using KSZPL.Core.Dtos.PatientCard;
using System;
using System.Collections.Generic;
using System.Text;

namespace KSZPL.Core.Interfaces
{
    public interface IPatientCardService
    {
        List<ShowPatientCardDto> CreateModelToListAllPatientCards();
    }
}
