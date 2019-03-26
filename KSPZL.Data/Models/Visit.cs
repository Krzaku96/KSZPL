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
        public int Id { get; set; }

        public string Status { get; set; }

        [ForeignKey("PatientCard")]
        public int PatientCardId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        public string Description { get; set; }

        public string Place { get; set; }

        public DateTime DateVisit { get; set; }
    }
}
