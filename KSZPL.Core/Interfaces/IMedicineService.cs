using KSZPL.Core.Dtos.Medicine;
using System;
using System.Collections.Generic;
using System.Text;

namespace KSZPL.Core.Interfaces
{
    public interface IMedicineService
    {
        List<GetMedicineDto> GetMedicines();
    }
}
