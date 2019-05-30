using KSZPL.Core.Dtos.Medicine;
using System;
using System.Collections.Generic;
using System.Text;

namespace KSZPL.Core.Dtos.Recipe
{
    public class ShowRecipeNewDto
    {
        public int Id { get; set; }
        public int PatientCardId { get; set; }
        public int UserId { get; set; }
        public int VisitId { get; set; }
        public DateTime DateRelease { get; set; }
        public List<GetMedicineDto> SelectedMedicines { get; set; }
    }
}
