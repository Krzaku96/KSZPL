using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using KSZPL.Api.Dtos.Patient;
using KSZPL.Api.Dtos.User;
using KSZPL.Api.Dtos.Visit;
using KSZPL.Api.ViewModels;
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
        public IActionResult EditVisit([FromBody]VisitDto visitDto)
        {
            if (visitDto.Id != 0 && !ModelState.IsValid)
            {
                return BadRequest();
            }
            var visit = _mapper.Map<Visit>(visitDto);

            return Ok(_repository.Update(visit));
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

            var visits = _repository.GetAll();
            var visitDtos = _mapper.Map<IList<VisitDto>>(visits);
            return Ok(visitDtos);
        }

        [AllowAnonymous]
        [HttpGet("getvisit/{id}")]
        public IActionResult GetVisit(int id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            var visit = _repository.GetById(id);
            var visitDto = _mapper.Map<VisitDto>(visit);
            return Ok(visitDto);
        }



    }
}