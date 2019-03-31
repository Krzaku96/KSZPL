using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using KSZPL.Api.Dtos.Patient;
using KSZPL.Core.Interfaces;
using KSZPL.Data.Context;
using KSZPL.Data.Models;
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

        public PatientController(KSZPLDbContext dbContext, IMapper mapper, IPatientService patientService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _patientService = patientService;
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

            return Ok(_patientService.RegisterPatient(patient));
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

            return Ok(_patientService.EditPatient(patient));
        }

        [AllowAnonymous]
        [HttpDelete("deletepatient/{id}")]
        public IActionResult DeletePatient(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (!_patientService.DeletePatient(id))
            {
                return BadRequest();
            }

            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("getallpatients")]
        public IActionResult GetAllPatients()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var patients = _patientService.GetAllPatients();
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

            var patient = _patientService.GetPatient(id);
            var patientDto = _mapper.Map<PatientDto>(patient);
            return Ok(patientDto);
        }


    }
}