using AutoMapper;
using KSZPL.Core.Dtos.Patient;
using KSZPL.Core.Dtos.PatientCard;
using KSZPL.Core.Dtos.User;
using KSZPL.Core.Dtos.Visit;
using KSZPL.Core.Interfaces;
using KSZPL.Data.Models;
using KSZPL.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KSZPL.Core.Services
{
    public class PatientCardService : IPatientCardService
    {
        private readonly IRepository<Recipe> _repositoryRecipe;
        private readonly IRepository<User> _repositoryUser;
        private readonly IRepository<Patient> _repositoryPatient;
        private readonly IRepository<Visit> _repositoryVisit;
        private readonly IRepository<PatientCard> _repositoryPatientCard;
        private readonly IMapper _mapper;

        public PatientCardService(IRepository<Recipe> repositoryRecipe, IRepository<User> repositoryUser, IRepository<Patient> repositoryPatient,
                                  IRepository<Visit> repositoryVisit, IRepository<PatientCard> repositoryPatientCard, IMapper mapper)
        {
            _repositoryRecipe = repositoryRecipe;
            _repositoryUser = repositoryUser;
            _repositoryPatient = repositoryPatient;
            _mapper = mapper;
            _repositoryVisit = repositoryVisit;
            _repositoryPatientCard = repositoryPatientCard;
        }


        public List<ShowPatientCardDto> CreateModelToListAllPatientCards()
        {
            var allPatient = _repositoryPatient.GetAll();
            var patientsDto = _mapper.Map<IList<PatientDto>>(allPatient);
            var allUsers = _repositoryUser.GetAll();
            var usersDto = _mapper.Map<IList<UserDto>>(allUsers);
            var allVisits = _repositoryVisit.GetAll();
            var visitsDto = _mapper.Map<IList<VisitDto>>(allVisits);
            var allPatientCards = _repositoryPatientCard.GetAll();
            var patientCardsDto = _mapper.Map<IList<PatientCardDto>>(allPatientCards);

            List<ShowPatientCardDto> listPatientCards = new List<ShowPatientCardDto>();

            foreach (var patientCard in allPatientCards)
            {
                var patientName = (from p in patientsDto
                                   where p.Id == patientCard.Id
                                   select p.Name).FirstOrDefault();
                var patientSurname = (from p in patientsDto
                                      where p.Id == patientCard.Id
                                      select p.Surname).FirstOrDefault();

                var patient = patientName + " " + patientSurname;

                var doctorFirstName = (from p in usersDto
                                       where p.Id == patientCard.UserId
                                       select p.FirstName).FirstOrDefault();
                var doctorLastName = (from p in usersDto
                                      where p.Id == patientCard.UserId
                                      select p.LastName).FirstOrDefault();
                var doctor = doctorFirstName + " " + doctorLastName;

                var dateLastVisit = (from v in visitsDto
                                 where v.PatientCardId == patientCard.Id
                                 select v.DateVisit).FirstOrDefault();

                var dateRegister = (from p in patientsDto
                                    where p.Id == patientCard.PatientId
                                    select p.DateRegister).FirstOrDefault();

                listPatientCards.Add(new ShowPatientCardDto
                {
                    Id = patientCard.Id,
                    PatientName = patient,
                    DoctorName = doctor,
                    DateLastVisit = dateLastVisit,
                    DateRegister = dateRegister
                });
            }

            return listPatientCards;
        }

        public List<VisitDto> GetHistoryOfTreatmentPatient(int idPatientCard)
        {
            var allVisits = _repositoryVisit.GetAll();
            var visitsDto = _mapper.Map<IList<VisitDto>>(allVisits);

            var visitsPatient = (from v in visitsDto
                                 where v.PatientCardId == idPatientCard
                                 select v).ToList();

            return visitsPatient;

        }
    }
}
