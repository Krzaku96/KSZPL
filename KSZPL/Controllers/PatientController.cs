using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using KSZPL.Api.Dtos.Patient;
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
        private readonly IRepository<Patient> _repository;

        public PatientController(KSZPLDbContext dbContext, IMapper mapper, IRepository<Patient> repository)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _repository = repository;
        }

        [AllowAnonymous]
        [HttpPost("registerpatient")]
        public IActionResult RegisterPatient([FromBody]PatientDto patientDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var patient = _mapper.Map<Patient>(patientDto);

            return Ok(_repository.Add(patient));

        }

        [AllowAnonymous]
        [HttpPut("editpatient")]
        public IActionResult EditPatient([FromBody]PatientDto patientDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var patient = _mapper.Map<Patient>(patientDto);

            return Ok(_repository.Update(patient));
        }

        [AllowAnonymous]
        [HttpDelete("deletepatient/{id}")]
        public IActionResult DeletePatient(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var patient = _dbContext.Patients.FirstOrDefault(x => x.Id == id);

            return Ok(_repository.Delete(patient));
        }

        [AllowAnonymous]
        [HttpGet("getallpatients")]
        public IActionResult GetAllPatients()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var patients = _repository.GetAll();
            var patientDtos = _mapper.Map<IList<PatientDto>>(patients);
            return Ok(patientDtos);
        }

        [AllowAnonymous]
        [HttpGet("getpatient/{id}")]
        public IActionResult GetPatient(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var patient = _repository.GetById(id);
            var patientDto = _mapper.Map<PatientDto>(patient);
            return Ok(patientDto);
        }


    }
}