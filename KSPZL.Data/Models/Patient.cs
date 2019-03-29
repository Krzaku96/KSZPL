using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace KSZPL.Data.Models
{
    public class Patient
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public DateTime DateRegister { get; set; }

        public string Address { get; set; }

        public string Email { get; set; }

        public int? NIP { get; set; }

        public int PESEL { get; set; }

        public DateTime DateBirth { get; set; }

    }
}
