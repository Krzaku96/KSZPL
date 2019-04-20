using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KSZPL.Api.ViewModels
{
    public class CreateVisitDto
    {
        public List<SelectFormDto> Patients { get; set; }
        public List<SelectFormDto> Doctors { get; set; }
    }
}
