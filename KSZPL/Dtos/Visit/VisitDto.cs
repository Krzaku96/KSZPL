using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KSZPL.Api.Dtos.Visit
{
    public class VisitDto
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public int PatientCardId { get; set; }
        public int UserId { get; set; }
        public string Description { get; set; }
        public string Place { get; set; }
        public DateTime DateVisit { get; set; }
    }
}
