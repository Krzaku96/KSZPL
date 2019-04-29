using System.Collections.Generic;
using KSZPL.Data.Models;

namespace KSZPL.Core.Interfaces
{
    public interface IPatientService
    {
        void Update(Patient patientDto);
        void Add(Patient patientDto);
        void Delete(int id);
        Patient GetById(int id);
        IEnumerable<Patient> GetAll();
    }
}
