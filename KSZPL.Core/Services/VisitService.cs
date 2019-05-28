using AutoMapper;
using KSZPL.Core.Dtos;
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
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace KSZPL.Core.Services
{
    public class VisitService : IVisitService
    {
        private readonly IRepository<Patient> _repositoryPatient;
        private readonly IRepository<User> _repositoryUser;
        private readonly IRepository<PatientCard> _repositoryPatientCard;
        private readonly IRepository<Visit> _repositoryVisit;
        private readonly IMapper _mapper;

        public VisitService(IRepository<Patient> repositoryPatient, IRepository<User> repositoryUser, IRepository<PatientCard> repositoryPatientCard,
            IMapper mapper, IRepository<Visit> repositoryVisit)
        {
            _repositoryPatient = repositoryPatient;
            _repositoryUser = repositoryUser;
            _repositoryPatientCard = repositoryPatientCard;
            _repositoryVisit = repositoryVisit;
            _mapper = mapper;
        }

        public List<ShowVisitDto> VisitsForToday()
        {
            var visitsForToday = _repositoryVisit.GetAll().Where(x => x.DateVisit.Date == DateTime.Today);
            List<ShowVisitDto> listVisits = new List<ShowVisitDto>();

            foreach (var visit in visitsForToday)
            {
                var patientCardPatientId = _repositoryPatientCard.GetAll().Where(p => p.Id == visit.PatientCardId)
                    .Select(x => x.PatientId).SingleOrDefault();

                var patient = _repositoryPatient.GetAll().SingleOrDefault(p => p.Id == patientCardPatientId);

                var patientCardDoctorId = _repositoryPatientCard.GetAll().Where(p => p.Id == visit.PatientCardId)
                    .Select(x => x.UserId).SingleOrDefault();

                var doctor = _repositoryUser.GetAll().SingleOrDefault(x => x.Id == patientCardDoctorId);

                listVisits.Add(new ShowVisitDto()
                {
                    Id = visit.Id,
                    Status = visit.Status,
                    PatientCardId = visit.PatientCardId,
                    UserId = visit.UserId,
                    Description = visit.Description,
                    Place = visit.Place,
                    DateVisit = visit.DateVisit,
                    PatientName = patient.Name + " " + patient.Surname,
                    DoctorName = doctor.FirstName + " " + doctor.LastName
                });
            }

            listVisits.OrderByDescending(d => d.DateVisit);

            return listVisits;
        }

        public IEnumerable<Visit> VisitsForDoctor(int doctorId)
        {
            return _repositoryVisit.GetAll().Where(x => x.UserId == doctorId);
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
                                     select x.Id).FirstOrDefault();

                patientsSelectForm.Add(new SelectFormDto() { label = item, value = idPatientCard.ToString() });
            }

            return new CreateVisitDto() { Doctors = doctorsSelectForm, Patients = patientsSelectForm };

        }

        public ShowVisitDto CreateModelToShowVisit(int id)
        {
            var allVisit = _repositoryVisit.GetAll();
            var visitsDto = _mapper.Map<IList<VisitDto>>(allVisit);
            var allPatient = _repositoryPatient.GetAll();
            var patientsDto = _mapper.Map<IList<PatientDto>>(allPatient);
            var allUsers = _repositoryUser.GetAll();
            var usersDto = _mapper.Map<IList<UserDto>>(allUsers);

            var visit = (from v in visitsDto
                        where v.Id == id
                        select new Visit
                        { Id = v.Id,
                            Status = v.Status,
                            PatientCardId = v.PatientCardId,
                            Description = v.Description,
                            DateVisit = v.DateVisit,
                            Place = v.Place,
                            UserId = v.UserId }).First();

            var patientName = (from p in patientsDto
                               where p.Id == visit.PatientCardId
                               select p.Name).FirstOrDefault();
            var patientSurname = (from p in patientsDto
                                  where p.Id == visit.PatientCardId
                                  select p.Surname).FirstOrDefault();

            var patient = patientName + " " + patientSurname;


            var doctorFirstName = (from p in usersDto
                                   where p.Id == visit.UserId
                                   select p.FirstName).FirstOrDefault();
            var doctorLastName = (from p in usersDto
                                  where p.Id == visit.UserId
                                  select p.LastName).FirstOrDefault();
            var doctor = doctorFirstName + " " + doctorLastName;

            return new ShowVisitDto()
            {
                Id = id,
                Status = visit.Status,
                PatientCardId = visit.PatientCardId,
                UserId = visit.UserId,
                Description = visit.Description,
                Place = visit.Place,
                DateVisit = visit.DateVisit,
                PatientName = patient,
                DoctorName = doctor
            };

        }

        public List<ShowVisitDto> CreateModelToListAllVisits()
        {
            var allVisit = _repositoryVisit.GetAll();
            var visitsDto = _mapper.Map<IList<VisitDto>>(allVisit);
            var allPatient = _repositoryPatient.GetAll();
            var patientsDto = _mapper.Map<IList<PatientDto>>(allPatient);
            var allUsers = _repositoryUser.GetAll();
            var usersDto = _mapper.Map<IList<UserDto>>(allUsers);

            
            List<ShowVisitDto> listVisits = new List<ShowVisitDto>();

                foreach (var visit in allVisit)
                {
                var patientName = (from p in patientsDto
                                   where p.Id == visit.PatientCardId
                                   select p.Name).FirstOrDefault();
                var patientSurname = (from p in patientsDto
                                      where p.Id == visit.PatientCardId
                                      select p.Surname).FirstOrDefault();

                var patient = patientName + " " + patientSurname;

                var doctorFirstName = (from p in usersDto
                                       where p.Id == visit.UserId
                                       select p.FirstName).FirstOrDefault();
                var doctorLastName = (from p in usersDto
                                      where p.Id == visit.UserId
                                      select p.LastName).FirstOrDefault();
                var doctor = doctorFirstName + " " + doctorLastName;

                listVisits.Add(new ShowVisitDto()
                    {
                        Id = visit.Id,
                        Status = visit.Status,
                        PatientCardId = visit.PatientCardId,
                        UserId = visit.UserId,
                        Description = visit.Description,
                        Place = visit.Place,
                        DateVisit = visit.DateVisit,
                        PatientName = patient,
                        DoctorName = doctor
                    });
                }

            listVisits.OrderByDescending(d => d.DateVisit);

            return listVisits;
        }

        public List<ShowVisitDto> CreateModelToFindVisit(int idPatient, int idDoctor, string dateVisitString)
        {
            var allVisit = _repositoryVisit.GetAll();
            var visitsDto = _mapper.Map<IList<VisitDto>>(allVisit);
            var allPatient = _repositoryPatient.GetAll();
            var patientsDto = _mapper.Map<IList<PatientDto>>(allPatient);
            var allUsers = _repositoryUser.GetAll();
            var usersDto = _mapper.Map<IList<UserDto>>(allUsers);


            List<ShowVisitDto> listVisits = new List<ShowVisitDto>();

            foreach (var visit in allVisit)
            {
                var patientName = (from p in patientsDto
                                   where p.Id == visit.PatientCardId
                                   select p.Name).FirstOrDefault();
                var patientSurname = (from p in patientsDto
                                      where p.Id == visit.PatientCardId
                                      select p.Surname).FirstOrDefault();

                var patient = patientName + " " + patientSurname;

                var doctorFirstName = (from p in usersDto
                                       where p.Id == visit.UserId
                                       select p.FirstName).FirstOrDefault();
                var doctorLastName = (from p in usersDto
                                      where p.Id == visit.UserId
                                      select p.LastName).FirstOrDefault();
                var doctor = doctorFirstName + " " + doctorLastName;

                listVisits.Add(new ShowVisitDto()
                {
                    Id = visit.Id,
                    Status = visit.Status,
                    PatientCardId = visit.PatientCardId,
                    UserId = visit.UserId,
                    Description = visit.Description,
                    Place = visit.Place,
                    DateVisit = visit.DateVisit,
                    PatientName = patient,
                    DoctorName = doctor
                });
            }

            DateTime dateVisit = DateTime.ParseExact(dateVisitString,"d-M-yyyy",System.Globalization.CultureInfo.GetCultureInfo("pl-pl").DateTimeFormat);

            listVisits.OrderByDescending(d => d.DateVisit);

            var filteredList = new List<ShowVisitDto>();


            if(idDoctor == 0)
            {
                if (idPatient != 0)
                {
                    filteredList = (listVisits.Where(x => x.PatientCardId == GetPatientCardId(idPatient)).DefaultIfEmpty()
                   .Where(x => x != null && x.DateVisit.Date == dateVisit).DefaultIfEmpty()).ToList();
                }
                else
                {
                    filteredList = listVisits.Where(x => x != null && x.DateVisit.Date == dateVisit).DefaultIfEmpty().ToList();
                }
            }
            if (idPatient == 0)
            {
                if (idDoctor != 0)
                {
                    filteredList = (listVisits.Where(x => x.UserId == idDoctor).DefaultIfEmpty()
                    .Where(x => x != null && x.DateVisit.Date == dateVisit).DefaultIfEmpty()).ToList();
                }
                else
                {
                    filteredList = listVisits.Where(x => x != null && x.DateVisit.Date == dateVisit).DefaultIfEmpty().ToList();
                }
            }
            if(idDoctor != 0 && idPatient != 0)
            {
                if (GetPatientCardId(idPatient) != 0)
                {
                    filteredList = (listVisits.Where(x => x.UserId == idDoctor).DefaultIfEmpty()
                   .Where(x => x.PatientCardId == GetPatientCardId(idPatient)).DefaultIfEmpty()
                   .Where(x => x != null && x.DateVisit.Date == dateVisit).DefaultIfEmpty()).ToList();
                }
            }


            return filteredList;
        }

        public GetEditVisitDto CreateModelToEditVisit(int id)
        {
            var allVisit = _repositoryVisit.GetAll();
            var visitsDto = _mapper.Map<IList<VisitDto>>(allVisit);
            var allPatient = _repositoryPatient.GetAll();
            var patientsDto = _mapper.Map<IList<PatientDto>>(allPatient);
            var allUsers = _repositoryUser.GetAll();
            var usersDto = _mapper.Map<IList<UserDto>>(allUsers);
            var allPatientCard = _repositoryPatientCard.GetAll();
            var patientCardsDto = _mapper.Map<IList<PatientCardDto>>(allPatientCard);

            var visit = (from v in visitsDto
                         where v.Id == id
                         select new Visit
                         {
                             Id = v.Id,
                             Status = v.Status,
                             PatientCardId = v.PatientCardId,
                             Description = v.Description,
                             DateVisit = v.DateVisit,
                             Place = v.Place,
                             UserId = v.UserId
                         }).First();

            var patientCardId = (from p in visitsDto
                                 where p.Id == id
                                 select p.PatientCardId).FirstOrDefault();

            var doctorId = (from p in visitsDto
                            where p.Id == id
                            select p.UserId).FirstOrDefault();


            var patientId = (from p in patientsDto
                               where p.Id == patientCardId
                               select p.Id).FirstOrDefault();

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
                var idDoctor = (from x in usersDto
                          where x.FirstName == item.Split(' ')[0]
                          select x.Id).First();
                doctorsSelectForm.Add(new SelectFormDto() { label = item, value = idDoctor.ToString() });
            }
            foreach (var item in patients)
            {
                var idPatient = (from x in patientsDto
                                 where x.Name == item.Split(' ')[0]
                                 select x.Id).FirstOrDefault();

                var idPatientCard = (from x in patientCardsDto
                                     where x.PatientId == idPatient
                                     select x.Id).FirstOrDefault();

                patientsSelectForm.Add(new SelectFormDto() { label = item, value = idPatientCard.ToString() });
            }

            return new GetEditVisitDto()
            {
                Id = id,
                Status = visit.Status,
                PatientCardId = visit.PatientCardId,
                UserId = visit.UserId,
                Description = visit.Description,
                Place = visit.Place,
                DateVisit = visit.DateVisit,
                PatientId = patientId,
                DoctorId = doctorId,
                Patients = patientsSelectForm,
                Doctors = doctorsSelectForm
            };
        }

        public int GetPatientCardId(int patientId)
        {
            var allPatientCard = _repositoryPatientCard.GetAll();
            var patientCardsDto = _mapper.Map<IList<PatientCardDto>>(allPatientCard);

            var patientCardId = (from p in patientCardsDto
                                 where p.Id == patientId
                                 select p.Id).FirstOrDefault();

            return patientCardId;
        }
    }
}
