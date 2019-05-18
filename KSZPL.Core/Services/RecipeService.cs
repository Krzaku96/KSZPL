using Aspose.Pdf;
using Aspose.Pdf.Drawing;
using Aspose.Pdf.Text;
using AutoMapper;
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
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
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

        public void GenerateRecipePdf(int idVisit)
        {
            var visit = _repositoryVisit.GetById(idVisit);
            var visitDto = _mapper.Map<VisitDto>(visit);
            var allUsers = _repositoryUser.GetAll();
            var usersDto = _mapper.Map<IList<UserDto>>(allUsers);
            var allPatientCards = _repositoryPatientCard.GetAll();
            var patientCardsDto = _mapper.Map<IList<PatientCardDto>>(allPatientCards);
            var allPatient = _repositoryPatient.GetAll();
            var patientsDto = _mapper.Map<IList<PatientDto>>(allPatient);
            var allRecipes = _repositoryRecipe.GetAll();
            var recipesDto = _mapper.Map<IList<RecipeDto>>(allRecipes);

            var recipeDto = (from r in recipesDto
                          where r.VisitId == visitDto.Id
                          select r).FirstOrDefault();

            var doctorFirstName = (from p in usersDto
                                   where p.Id == recipeDto.UserId
                                   select p.FirstName).FirstOrDefault();

            var doctorLastName = (from p in usersDto
                                  where p.Id == recipeDto.UserId
                                  select p.LastName).FirstOrDefault();

            var doctor = doctorFirstName + " " + doctorLastName;

            

            var patientId = (from p in patientCardsDto
                             where p.Id == recipeDto.PatientCardId
                             select p.PatientId).FirstOrDefault();

            var patientName = (from p in patientsDto
                               where p.Id == patientId
                               select p.Name).FirstOrDefault();
            var patientSurname = (from p in patientsDto
                                  where p.Id == patientId
                                  select p.Surname).FirstOrDefault();

            var patient = patientName + " " + patientSurname;

            var document = new Document
            {
                PageInfo = new PageInfo { Margin = new MarginInfo(0, 0, 0, 0) }
            };

            var page = document.Pages.Add();


            FloatingBox boxHeader = new FloatingBox((float)(page.CropBox.Width - 40), (float)(page.CropBox.URY - 800));
            FloatingBox box = new FloatingBox((float)(page.CropBox.Width - 200), (float)(page.CropBox.URY - 700));
            FloatingBox boxForSignature = new FloatingBox((float)(page.CropBox.Width - 40), (float)(page.CropBox.URY - 200));

            Graph graph = new Graph((float)page.PageInfo.Width, (float)page.PageInfo.Height);
            page.Paragraphs.Add(graph);
            Line bottomline = new Line(new float[] { 10, 10, (float)page.PageInfo.Width - 10, 10 });
            Line topline = new Line(new float[] { 10, (float)page.PageInfo.Height - 10, (float)page.PageInfo.Width - 10, (float)page.PageInfo.Height - 10 });
            Line rightline = new Line(new float[] { (float)page.PageInfo.Width - 10, 10, (float)page.PageInfo.Width - 10, (float)page.PageInfo.Height - 10 });
            Line leftline = new Line(new float[] { 10, 10, 10, (float)page.PageInfo.Height - 10 });
            graph.Shapes.Add(topline);
            graph.Shapes.Add(bottomline);
            graph.Shapes.Add(rightline);
            graph.Shapes.Add(leftline);
            graph.ZIndex = 0;

            var textFragment = new TextFragment("Recepta");
            textFragment.TextState.FontSize = 24;
            boxHeader.Paragraphs.Add(textFragment);

            TextFragment fragmentPatientName = new TextFragment("Imię i nazwisko pacjenta: " + patient);
            fragmentPatientName.TextState.FontSize = 11;
            fragmentPatientName.TextState.Font = FontRepository.FindFont("Arial");
            fragmentPatientName.Position = new Position(100, 700);
            box.Paragraphs.Add(fragmentPatientName);
            TextFragment fragmentDataRelease = new TextFragment("Data realizacji: " + recipeDto.DateRelease);
            fragmentDataRelease.TextState.FontSize = 11;
            fragmentDataRelease.TextState.Font = FontRepository.FindFont("Arial");
            fragmentDataRelease.Position = new Position(100, 680);
            box.Paragraphs.Add(fragmentDataRelease);
            TextFragment fragmentMedicines = new TextFragment("Przepisane leki: " + recipeDto.PrescribedMedicines);
            fragmentMedicines.TextState.FontSize = 11;
            fragmentMedicines.TextState.Font = FontRepository.FindFont("Arial");
            fragmentMedicines.Position = new Position(100, 660);
            box.Paragraphs.Add(fragmentMedicines);
            TextFragment fragmentDoctorName = new TextFragment("Imię i nazwisko lekarza: " + doctor);
            fragmentDoctorName.TextState.FontSize = 11;
            fragmentDoctorName.TextState.Font = FontRepository.FindFont("Arial");
            fragmentDoctorName.Position = new Position(100, 640);
            box.Paragraphs.Add(fragmentDoctorName);

            TextFragment fragmentSignature = new TextFragment("Miejsce na podpis lekarza:");
            fragmentSignature.TextState.FontSize = 9;
            fragmentSignature.TextState.Font = FontRepository.FindFont("Arial");
            fragmentSignature.Position = new Position(60, 550);
            boxForSignature.Paragraphs.Add(fragmentSignature);
            TextFragment fragmentSignature2 = new TextFragment("Miejsce na pieczątkę ośrodka zdrowia:");
            fragmentSignature2.TextState.FontSize = 9;
            fragmentSignature2.TextState.Font = FontRepository.FindFont("Arial");
            fragmentSignature2.Position = new Position(380, 550);
            boxForSignature.Paragraphs.Add(fragmentSignature2);

            boxHeader.ZIndex = 1;
            boxHeader.Top = 40;
            boxHeader.Left = 260; 
    
            box.ZIndex = 2;
            box.Top = 100;
            box.Left = 110;
            box.HorizontalAlignment = HorizontalAlignment.Center;

            box.Border = new BorderInfo(BorderSide.All, Color.DarkSlateGray);
            page.Paragraphs.Add(boxHeader);
            page.Paragraphs.Add(box);
            page.Paragraphs.Add(boxForSignature);

            document.Save(String.Format("Recepta-wizyta{0}.pdf", recipeDto.VisitId));
        }
    }
}
