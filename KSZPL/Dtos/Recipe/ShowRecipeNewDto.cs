using KSZPL.Api.Dtos.Medicine;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KSZPL.Api.Dtos.Recipe
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
