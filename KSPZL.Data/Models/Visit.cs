using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace KSZPL.Data.Models
{
    public class Visit
    {
        [Key]
        public decimal Id { get; set; }

        public string Status { get; set; }

        [ForeignKey("Patient")]
        public decimal IdPatient { get; set; }

        [ForeignKey("User")]
        public decimal IdUser { get; set; }

        public string Description { get; set; }

        public string Place { get; set; }

        public DateTime DateVisit { get; set; }
    }
}
