using KSZPL.Core.Dtos.Recipe;
using KSZPL.Core.Dtos.Visit;
using System;
using System.Collections.Generic;
using System.Text;

namespace KSZPL.Core.Dtos.PatientCard
{
    public class ShowPatientCardDto
    {
        public int Id { get; set; }
        public string PatientName { get; set; }
        public string DoctorName { get; set; }
        public DateTime DateLastVisit { get; set; }
        public DateTime DateRegister { get; set; }

    }
}
