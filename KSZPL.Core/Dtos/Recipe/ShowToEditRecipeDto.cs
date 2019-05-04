using System;
using System.Collections.Generic;
using System.Text;

namespace KSZPL.Core.Dtos.Recipe
{
    public class ShowToEditRecipeDto
    {
        public int Id { get; set; }
        public DateTime DateRelease { get; set; }
        public string PrescribedMedicines { get; set; }
        public string DoctorName { get; set; }
        public string PatientName { get; set; }
        public int UserId { get; set; }
        public int PatientCardId { get; set; }
        public int VisitId { get; set; }
    }
}
