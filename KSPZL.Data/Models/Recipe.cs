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
        public int Id { get; set; }

        [ForeignKey("PatientCard")]
        public int PatientCardId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        public DateTime DateRelease { get; set; }

        public string PrescribedMedicines { get; set; }
    }
}
