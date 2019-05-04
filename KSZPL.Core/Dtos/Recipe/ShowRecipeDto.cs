using System;
using System.Collections.Generic;
using System.Text;

namespace KSZPL.Core.Dtos.Recipe
{
    public class ShowRecipeDto
    {
        public int Id { get; set; }
        public string DoctorName { get; set; }
        public DateTime DateRelease { get; set; }
        public string PrescribedMedicines { get; set; }
    }
}
