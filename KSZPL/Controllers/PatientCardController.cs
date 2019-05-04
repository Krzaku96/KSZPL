using AutoMapper;
using KSZPL.Api.Dtos.PatientCard;
using KSZPL.Core.Interfaces;
using KSZPL.Data.Context;
using KSZPL.Data.Models;
using KSZPL.Data.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KSZPL.Api.Controllers
{
    [Route("[controller]")]
    public class PatientCardController : Controller
    {
        private readonly KSZPLDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IRepository<PatientCard> _repository;
        private readonly IPatientCardService _patientCardService;

        public PatientCardController(KSZPLDbContext dbContext, IMapper mapper, IRepository<PatientCard> repository, IPatientCardService patientCardService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _repository = repository;
            _patientCardService = patientCardService;
        }

        [AllowAnonymous]
        [HttpPost("registerpatientcard")]
        public IActionResult RegisterPatientCard([FromBody]PatientCardDto patientCardDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var patientCard = _mapper.Map<PatientCard>(patientCardDto);

            return Ok(_repository.Add(patientCard));

        }

        [AllowAnonymous]
        [HttpPut("editpatientcard")]
        public IActionResult EditPatientCard([FromBody]PatientCardDto patientCardDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var patientCard = _mapper.Map<PatientCard>(patientCardDto);

            return Ok(_repository.Update(patientCard));
        }
        
        [AllowAnonymous]
        [HttpDelete("deletepatientcard/{id}")]
        public IActionResult DeletePatientCard(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var patientCard = _dbContext.PatientCards.FirstOrDefault(x => x.Id == id);

            return Ok(_repository.Delete(patientCard));
        }

        [AllowAnonymous]
        [HttpGet("getallpatientcards")]
        public IActionResult GetAllPatientCards()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            //var patientCards = _repository.GetAll();
            //var patientCardDtos = _mapper.Map<IList<PatientCardDto>>(patientCards);

            return Ok(_patientCardService.CreateModelToListAllPatientCards());
        }

        [AllowAnonymous]
        [HttpGet("getpatientcard/{id}")]
        public IActionResult GetPatientCard(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var patientCard = _repository.GetById(id);
            var patientCardDto = _mapper.Map<PatientCardDto>(patientCard);
            return Ok(patientCardDto);
        }
    }
}
