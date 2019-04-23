using AutoMapper;
using KSZPL.Api.Dtos.Patient;
using KSZPL.Data.Models;

namespace KSZPL.Api.Modules
{
    public class AutomapperProfiles : Profile
    {
        public AutomapperProfiles()
        {
            CreateMap<PatientCreateDto, Patient>();
        }
    }
}
