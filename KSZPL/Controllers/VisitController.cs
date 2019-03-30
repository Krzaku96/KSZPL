using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using KSZPL.Api.Dtos.Visit;
using KSZPL.Core.Interfaces;
using KSZPL.Data.Context;
using KSZPL.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KSZPL.Api.Controllers
{
    [Route("[controller]")]
    public class VisitController : Controller
    {
        private readonly KSZPLDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IVisitService _visitService;

        public VisitController(IMapper mapper, KSZPLDbContext dbContext, IVisitService visitService)
        {
            _mapper = mapper;
            _dbContext = dbContext;
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

            return Ok(_visitService.CreateVisit(visit));
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

            return Ok(_visitService.EditVisit(visit));
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

            if (!_visitService.DeleteVisit(id))
            {
                return BadRequest();
            }

            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("getallvisit")]
        public IActionResult GetAllVisit()
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            var visits = _visitService.GetAllVisits();
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

            var visit = _visitService.GetVisit(id);
            var visitDto = _mapper.Map<VisitDto>(visit);
            return Ok(visitDto);
        }



    }
}