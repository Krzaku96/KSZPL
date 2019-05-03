using System;
using System.Collections.Generic;
using System.Text;

namespace KSZPL.Core.Dtos.Recipe
{
    public class RegisterRecipeDto
    {
        public string PatientName { get; set; }
        public string DoctorName { get; set; }
        public int PatientCardId { get; set; }
        public int DoctorId { get; set; }
    }
}
