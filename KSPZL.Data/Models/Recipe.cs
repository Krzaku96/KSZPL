using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace KSZPL.Data.Models
{
    public class Recipe
    {
        [Key]
        public decimal Id { get; set; }

        [ForeignKey("PatientCard")]
        public decimal IdPatientCard { get; set; }

        [ForeignKey("User")]
        public decimal IdUser { get; set; }

        public DateTime DateRelease { get; set; }

        public string PrescribedMedicines { get; set; }
    }
}
