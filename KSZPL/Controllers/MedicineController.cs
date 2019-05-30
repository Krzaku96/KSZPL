using AutoMapper;
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
    public class MedicineController : Controller
    {
        private readonly KSZPLDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IRepository<Medicine> _repository;
        private readonly IMedicineService _medicineService;

        public MedicineController(KSZPLDbContext dbContext, IMapper mapper, IRepository<Medicine> repository, IMedicineService medicineService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _repository = repository;
            _medicineService = medicineService;
        }

        [AllowAnonymous]
        [HttpGet("getmedicines")]
        public IActionResult GetMedicines()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var medicines = _medicineService.GetMedicines();

            return Ok(medicines);
        }
    }
}
