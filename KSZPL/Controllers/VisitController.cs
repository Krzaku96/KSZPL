using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using KSZPL.Api.Dtos.Patient;
using KSZPL.Api.Dtos.User;
using KSZPL.Api.Dtos.Visit;
using KSZPL.Core.Interfaces;
using KSZPL.Data.Context;
using KSZPL.Data.Models;
using KSZPL.Data.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KSZPL.Api.Controllers
{
    [Route("[controller]")]
    public class VisitController : Controller
    {
        private readonly KSZPLDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IRepository<Visit> _repository;
        private readonly IVisitService _visitService;


        public VisitController(IMapper mapper, KSZPLDbContext dbContext, IRepository<Visit> repository,
            IVisitService visitService)
        {
            _mapper = mapper;
            _dbContext = dbContext;
            _repository = repository;
            _visitService = visitService;
        }

        [AllowAnonymous]
        [HttpPost("createvisit")]
        public IActionResult CreateVisit([FromBody]VisitDto visitDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var visit = _mapper.Map<Visit>(visitDto);

            return Ok(_repository.Add(visit));
        }

        [AllowAnonymous]
        [HttpGet("createvisit")]
        public IActionResult CreateVisit()
        {
            return Ok(_visitService.CreateModeltoCreateVisit());
        }

        [AllowAnonymous]
        [HttpPut("editvisit")]
        public IActionResult EditVisit([FromBody]EditVisitDto editVisitDto)
        {
            if (editVisitDto.Id != 0 && !ModelState.IsValid)
            {
                return BadRequest();
            }

            var patientCardId = _visitService.GetPatientCardId(editVisitDto.PatientId);

            var visit = _dbContext.Visits.Where(x => x.Id == editVisitDto.Id).FirstOrDefault();

            visit.PatientCardId = patientCardId;
            visit.Id = editVisitDto.Id;
            visit.Status = editVisitDto.Status;
            visit.PatientCardId = patientCardId;
            visit.UserId = editVisitDto.UserId;
            visit.Description = editVisitDto.Description;
            visit.Place = editVisitDto.Place;
            visit.DateVisit = editVisitDto.DateVisit;

            return Ok(_repository.Update(visit));
        }

        [AllowAnonymous]
        [HttpGet("editvisit/{id}")]
        public IActionResult EditVisit(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            return Ok(_visitService.CreateModelToEditVisit(id));
        }

        [AllowAnonymous]
        [HttpDelete]
        [Route("deletevisit/{id}")]
        public IActionResult DeleteVisit(int id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            var visit = _dbContext.Visits.FirstOrDefault(x => x.Id == id);

            return Ok(_repository.Delete(visit));
        }

        [AllowAnonymous]
        [HttpGet("getallvisit")]
        public IActionResult GetAllVisit()
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

          //  var visits = _repository.GetAll();
          //  var visitDtos = _mapper.Map<IList<VisitDto>>(visits);
            return Ok(_visitService.CreateModelToListAllVisits());
        }

        [AllowAnonymous]
        [HttpGet("getvisit/{id}")]
        public IActionResult GetVisit(int id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            return Ok(_visitService.CreateModelToShowVisit(id));
        }



    }
}