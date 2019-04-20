using KSZPL.Core.Dtos;
using KSZPL.Core.Dtos.Patient;
using KSZPL.Core.Dtos.User;
using System;
using System.Collections.Generic;
using System.Text;

namespace KSZPL.Core.Interfaces
{
    public interface IVisitService
    {
        CreateVisitDto CreateModeltoCreateVisit();
    }
}
