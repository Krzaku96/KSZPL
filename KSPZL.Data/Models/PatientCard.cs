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
        public int Id { get; set; }

        [ForeignKey("Patient")]
        public int PatientId{ get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
    }
}
