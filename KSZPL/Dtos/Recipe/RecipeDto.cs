using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KSZPL.Api.Dtos.Recipe
{
    public class RecipeDto
    {
        public int Id { get; set; }
        public int PatientCardId { get; set; }
        public int UserId { get; set; }
        public DateTime DateRelease { get; set; }
        public string PrescribedMedicines { get; set; }
    }
}
