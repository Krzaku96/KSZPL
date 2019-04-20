using System;
using System.Collections.Generic;
using System.Text;

namespace KSZPL.Core.Dtos.Visit
{
    public class ShowVisitDto
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public int PatientCardId { get; set; }
        public int UserId { get; set; }
        public string Description { get; set; }
        public string Place { get; set; }
        public DateTime DateVisit { get; set; }
        public string PatientName { get; set; }
        public string DoctorName { get; set; }

    }
}
