using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KSZPL.Core.Dtos.Patient
{
    public class PatientDto
    {
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
