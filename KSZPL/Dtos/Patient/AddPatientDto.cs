using System;

namespace KSZPL.Api.Dtos.Patient
{
    public class AddPatientDto
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime DateRegister { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public int? NIP { get; set; }
        public int PESEL { get; set; }
        public DateTime DateBirth { get; set; }
        public int UserId { get; set; }
    }
}
