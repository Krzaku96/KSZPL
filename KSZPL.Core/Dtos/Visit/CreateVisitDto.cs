using System;
using System.Collections.Generic;
using System.Text;

namespace KSZPL.Core.Dtos
{
    public class CreateVisitDto
    {
        public List<SelectFormDto> Patients { get; set; }
        public List<SelectFormDto> Doctors { get; set; }
    }
}
