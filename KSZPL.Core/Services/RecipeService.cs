﻿using AutoMapper;
using KSZPL.Core.Dtos.Patient;
using KSZPL.Core.Dtos.PatientCard;
using KSZPL.Core.Dtos.Recipe;
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
    public class RecipeService : IRecipeService
    {
        private readonly IRepository<Recipe> _repositoryRecipe;
        private readonly IRepository<User> _repositoryUser;
        private readonly IRepository<Patient> _repositoryPatient;
        private readonly IRepository<Visit> _repositoryVisit;
        private readonly IRepository<PatientCard> _repositoryPatientCard;
        private readonly IMapper _mapper;

        public RecipeService(IRepository<Recipe> repositoryRecipe, IRepository<User> repositoryUser, IRepository<Patient> repositoryPatient,
            IMapper mapper, IRepository<Visit> repositoryVisit, IRepository<PatientCard> repositoryPatientCard)
        {
            _repositoryRecipe = repositoryRecipe;
            _repositoryUser = repositoryUser;
            _repositoryPatient = repositoryPatient;
            _mapper = mapper;
            _repositoryVisit = repositoryVisit;
            _repositoryPatientCard = repositoryPatientCard;
        }


        public RegisterRecipeDto CreateModelToRegisterRecipe(int idVisit)
        {
            var allPatient = _repositoryPatient.GetAll();
            var patientsDto = _mapper.Map<IList<PatientDto>>(allPatient);
            var allUsers = _repositoryUser.GetAll();
            var usersDto = _mapper.Map<IList<UserDto>>(allUsers);
            var allVisits = _repositoryVisit.GetAll();
            var visitsDto = _mapper.Map<IList<VisitDto>>(allVisits);
            var allPatientCards = _repositoryPatientCard.GetAll();
            var patientCardsDto = _mapper.Map<IList<PatientCardDto>>(allPatientCards);

            var patientCardId = (from v in visitsDto
                                 where v.Id == idVisit
                                 select v.PatientCardId).FirstOrDefault();

            var patientId = (from p in patientCardsDto
                             where p.Id == patientCardId
                             select p.PatientId).FirstOrDefault();

            var doctorId = (from v in visitsDto
                            where v.Id == idVisit
                            select v.UserId).FirstOrDefault();

            var patientName = (from p in patientsDto
                               where p.Id == patientId
                               select p.Name).FirstOrDefault();
            var patientSurname = (from p in patientsDto
                                  where p.Id == patientId
                                  select p.Surname).FirstOrDefault();

            var patient = patientName + " " + patientSurname;


            var doctorFirstName = (from p in usersDto
                                   where p.Id == doctorId
                                   select p.FirstName).FirstOrDefault();
            var doctorLastName = (from p in usersDto
                                  where p.Id == doctorId
                                  select p.LastName).FirstOrDefault();
            var doctor = doctorFirstName + " " + doctorLastName;

            return new RegisterRecipeDto() { PatientName = patient, DoctorName = doctor, DoctorId = doctorId, PatientCardId = patientCardId };
        }

        public ShowRecipeDto ShowRecipe(int idVisit)
        {
            var allUsers = _repositoryUser.GetAll();
            var usersDto = _mapper.Map<IList<UserDto>>(allUsers);
            var allRecipes = _repositoryRecipe.GetAll();
            var recipesDto = _mapper.Map<IList<RecipeDto>>(allRecipes);

            var recipeId = (from r in recipesDto
                          where r.VisitId == idVisit
                          select r.Id).FirstOrDefault();

            var dateRelease = (from r in recipesDto
                            where r.VisitId == idVisit
                            select r.DateRelease).FirstOrDefault();

            var doctorId = (from r in recipesDto
                            where r.VisitId == idVisit
                            select r.UserId).FirstOrDefault();

            var doctorFirstName = (from p in usersDto
                                   where p.Id == doctorId
                                   select p.FirstName).FirstOrDefault();

            var doctorLastName = (from p in usersDto
                                  where p.Id == doctorId
                                  select p.LastName).FirstOrDefault();

            var doctor = doctorFirstName + " " + doctorLastName;

            var prescribedMedicines = (from r in recipesDto
                            where r.VisitId == idVisit
                            select r.PrescribedMedicines).FirstOrDefault();


            return new ShowRecipeDto() { Id = recipeId, DateRelease = dateRelease, DoctorName = doctor, PrescribedMedicines = prescribedMedicines };
        }

        public ShowToEditRecipeDto CreateModelToEditShowRecipe(int idRecipe)
        {
            var allUsers = _repositoryUser.GetAll();
            var usersDto = _mapper.Map<IList<UserDto>>(allUsers);
            var allRecipes = _repositoryRecipe.GetAll();
            var recipesDto = _mapper.Map<IList<RecipeDto>>(allRecipes);
            var allPatientCards = _repositoryPatientCard.GetAll();
            var patientCardsDto = _mapper.Map<IList<PatientCardDto>>(allPatientCards);
            var allPatient = _repositoryPatient.GetAll();
            var patientsDto = _mapper.Map<IList<PatientDto>>(allPatient);
            var allVisits = _repositoryVisit.GetAll();
            var visitsDto = _mapper.Map<IList<VisitDto>>(allVisits);

            var recipe = recipesDto.Where(r => r.Id == idRecipe).FirstOrDefault();

            var doctorFirstName = (from p in usersDto
                                   where p.Id == recipe.UserId
                                   select p.FirstName).FirstOrDefault();

            var doctorLastName = (from p in usersDto
                                  where p.Id == recipe.UserId
                                  select p.LastName).FirstOrDefault();

            var doctor = doctorFirstName + " " + doctorLastName;

            var patientId = (from p in patientCardsDto
                             where p.Id == recipe.PatientCardId
                             select p.PatientId).FirstOrDefault();

            var patientName = (from p in patientsDto
                               where p.Id == patientId
                               select p.Name).FirstOrDefault();
            var patientSurname = (from p in patientsDto
                                  where p.Id == patientId
                                  select p.Surname).FirstOrDefault();

            var patient = patientName + " " + patientSurname;

            return new ShowToEditRecipeDto()
            {
                Id = recipe.Id,
                DateRelease = recipe.DateRelease,
                PrescribedMedicines = recipe.PrescribedMedicines,
                DoctorName = doctor,
                PatientName = patient,
                UserId = recipe.UserId,
                PatientCardId = recipe.PatientCardId,
                VisitId = recipe.VisitId
            };
        }
    }
}
