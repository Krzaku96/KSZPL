using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KSZPL.Api.Dtos.PatientCard
{
    public class PatientCardDto
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public int UserId { get; set; }
    }
}
