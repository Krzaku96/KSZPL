using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using KSZPL.Api.Dtos.Patient;
using KSZPL.Api.Dtos.PatientCard;
using KSZPL.Core.Interfaces;
using KSZPL.Data.Context;
using KSZPL.Data.Models;
using KSZPL.Data.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KSZPL.Api.Controllers
{
    [Route("[controller]")]
    public class PatientController : Controller
    {
        private readonly KSZPLDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IPatientService _patientService;
        private readonly IRepository<PatientCard> _repository;
        private readonly IPatientCardService _patientCardService;

        public PatientController(KSZPLDbContext dbContext, IMapper mapper, IPatientService patientService, IPatientCardService patientCardService, IRepository<PatientCard> repository)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _patientService = patientService;
            _patientCardService = patientCardService;
            _repository = repository;
        }

        [AllowAnonymous]
        [HttpPost("registerpatient")]
        public IActionResult RegisterPatient([FromBody]AddPatientDto addPatientDto)
        {
            var patient = new Patient
            {
                Address = addPatientDto.Address,
                DateBirth = addPatientDto.DateBirth,
                DateRegister = addPatientDto.DateRegister,
                Email = addPatientDto.Email,
                NIP = addPatientDto.NIP,
                PESEL = addPatientDto.PESEL,
                Name = addPatientDto.Name,
                Surname = addPatientDto.Surname
            };
            _patientService.Add(patient);

            var patientCard = new PatientCard {PatientId = patient.Id, UserId = addPatientDto.UserId};
            _repository.Add(patientCard);

            return Ok();
        }

        [AllowAnonymous]
        [HttpPut]
        public IActionResult EditPatient([FromBody]PatientDto patientDto)
        {
            var patient = _mapper.Map<Patient>(patientDto);
            _patientService.Update(patient);

            return Ok();
        }
        
        [AllowAnonymous]
        [HttpDelete("{id}")]
        public IActionResult DeletePatient(int id)
        {
            _patientService.Delete(id);
            return Ok();
        }
        
        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetAllPatients()
        {
            return Ok(_patientService.GetAll());
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetPatient(int id)
        {
            return Ok(_patientService.GetById(id));
        }
    }
}