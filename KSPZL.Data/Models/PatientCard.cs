using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace KSZPL.Data.Models
{
    public class PatientCard
    {
        [Key]
        public decimal Id { get; set; }

        [ForeignKey("Patient")]
        public decimal IdPatient{ get; set; }

        public string HistoryTreatment { get; set; }

        [ForeignKey("User")]
        public decimal IdUser { get; set; }
    }
}
