using KSZPL.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace KSZPL.Core.Interfaces
{
    public interface IPatientService
    {
        Patient RegisterPatient(Patient patient);
        Patient EditPatient(Patient patient);
        bool DeletePatient(int id);
        IEnumerable<Patient> GetAllPatients();
        Patient GetPatient(int id);
    }
}
