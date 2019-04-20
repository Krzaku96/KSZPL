using AutoMapper;
using KSZPL.Core.Dtos;
using KSZPL.Core.Dtos.Patient;
using KSZPL.Core.Dtos.PatientCard;
using KSZPL.Core.Dtos.User;
using KSZPL.Core.Interfaces;
using KSZPL.Data.Models;
using KSZPL.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KSZPL.Core.Services
{
    public class VisitService : IVisitService
    {
        private readonly IRepository<Patient> _repositoryPatient;
        private readonly IRepository<User> _repositoryUser;
        private readonly IRepository<PatientCard> _repositoryPatientCard;
        private readonly IMapper _mapper;

        public VisitService(IRepository<Patient> repositoryPatient, IRepository<User> repositoryUser, IRepository<PatientCard> repositoryPatientCard, IMapper mapper)
        {
            _repositoryPatient = repositoryPatient;
            _repositoryUser = repositoryUser;
            _repositoryPatientCard = repositoryPatientCard;
            _mapper = mapper;
        }

        public CreateVisitDto CreateModeltoCreateVisit()
        {
            var allPatient = _repositoryPatient.GetAll();
            var patientsDto = _mapper.Map<IList<PatientDto>>(allPatient);
            var allUsers = _repositoryUser.GetAll();
            var usersDto = _mapper.Map<IList<UserDto>>(allUsers);
            var allPatientCard = _repositoryPatientCard.GetAll();
            var patientCardsDto = _mapper.Map<IList<PatientCardDto>>(allPatientCard);


            var patientsNames = (from p in patientsDto
                                 select p.Name).ToList();
            var patientsSurnames = (from p in patientsDto
                                    select p.Surname).ToList();
            var patients = patientsNames.Zip(patientsSurnames, (x, y) => x + " " + y).ToList();

            
            var doctorsFirstNames = (from p in usersDto
                                     where p.Role == Role.Doctor
                                     select p.FirstName).ToList();
            var doctorsLastNames = (from p in usersDto
                                    where p.Role == Role.Doctor
                                    select p.LastName).ToList();
            var doctors = doctorsFirstNames.Zip(doctorsLastNames, (x, y) => x + " " + y).ToList();

            var doctorsSelectForm = new List<SelectFormDto>();
            var patientsSelectForm = new List<SelectFormDto>();

            foreach (var item in doctors)
            {
                var id = (from x in usersDto
                          where x.FirstName == item.Split(' ')[0]
                          select x.Id).First();
                doctorsSelectForm.Add(new SelectFormDto() { label = item, value = id.ToString() });
            }
            foreach (var item in patients)
            {
                var idPatient = (from x in patientsDto
                          where x.Name == item.Split(' ')[0]
                          select x.Id).First();

                var idPatientCard = (from x in patientCardsDto
                                     where x.PatientId == idPatient
                                     select x.Id).First();

                patientsSelectForm.Add(new SelectFormDto() { label = item, value = idPatientCard.ToString() });
            }

            return new CreateVisitDto() { Doctors = doctorsSelectForm, Patients = patientsSelectForm };

        }
    }
}
