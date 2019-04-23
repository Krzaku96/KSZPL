using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using KSZPL.Core.Dtos.Patient;
using KSZPL.Core.Helpers;
using KSZPL.Core.Interfaces;
using KSZPL.Data;
using KSZPL.Data.Models;

namespace KSZPL.Core.Services
{
    class PatientService : IPatientService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public PatientService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public void Add(Patient patientDto)
        {
            _unitOfWork.PatientRepository.Add(patientDto);
        }

        public void Update(Patient patientDto)
        {
            var patient = _unitOfWork.PatientRepository.GetById(patientDto.Id);

            if (patient == null)
                throw new AppException("User not found");

            _unitOfWork.PatientRepository.Update(patient);

            patient.Name = patientDto.Name;
            patient.Surname = patientDto.Surname;
            patient.Address = patientDto.Address;
            patient.Email = patientDto.Email;
            patient.DateBirth = patientDto.DateBirth;
            patient.PESEL = patientDto.PESEL;
            patient.NIP = patientDto.NIP;

            _unitOfWork.Save();
        }

        public Patient GetById(int id)
        {
            return _unitOfWork.PatientRepository.GetById(id);
        }

        public IEnumerable<Patient> GetAll()
        {
            return _unitOfWork.PatientRepository.GetAll();
        }

        public void Delete(int id)
        {
            var patient = _unitOfWork.PatientRepository.GetById(id);
            _unitOfWork.PatientRepository.Delete(patient);
        }
    }
}
