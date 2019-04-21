using System;
using System.Collections.Generic;
using System.Text;

namespace KSZPL.Core.Dtos.Visit
{
    public class GetEditVisitDto
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public int PatientCardId { get; set; }
        public int UserId { get; set; }
        public string Description { get; set; }
        public string Place { get; set; }
        public DateTime DateVisit { get; set; }
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public List<SelectFormDto> Patients { get; set; }
        public List<SelectFormDto> Doctors { get; set; }
    }
}
