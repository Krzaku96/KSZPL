using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace KSZPL.Data.Models
{
    public class Patient
    {
        [Key]
        public decimal Id { get; set; }

        public string Imie { get; set; }

        public string Nazwisko { get; set; }

        public DateTime DateRegister { get; set; }

        public string Address { get; set; }

        public string Email { get; set; }

        public decimal NIP { get; set; }

        public decimal PESEL { get; set; }

        public DateTime DateBirth { get; set; }
    }
}
