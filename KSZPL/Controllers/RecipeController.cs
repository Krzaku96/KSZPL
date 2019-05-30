using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using KSZPL.Api.Dtos.Recipe;
using KSZPL.Core.Interfaces;
using KSZPL.Data.Context;
using KSZPL.Data.Models;
using KSZPL.Data.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KSZPL.Api.Controllers
{
    [Route("[controller]")]
    public class RecipeController : Controller
    {
        private readonly KSZPLDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IRepository<Recipe> _repository;
        private readonly IRecipeService _recipeService;

        public RecipeController(KSZPLDbContext dbContext, IMapper mapper, IRepository<Recipe> repository, IRecipeService recipeService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _repository = repository;
            _recipeService = recipeService;
        }

        [AllowAnonymous]
        [HttpPost("registerrecipe")]
        public IActionResult RegisterRecipe([FromBody]ShowRecipeNewDto showRecipeNewDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            string medicines = null;

            foreach (var item in showRecipeNewDto.SelectedMedicines)
            {
                medicines = medicines +  item.value + " ";
            }

            RecipeDto recipeDto = new RecipeDto()
            {
                Id = showRecipeNewDto.Id,
                DateRelease = showRecipeNewDto.DateRelease,
                PatientCardId = showRecipeNewDto.PatientCardId,
                PrescribedMedicines = medicines,
                UserId = showRecipeNewDto.UserId,
                VisitId = showRecipeNewDto.VisitId
            };

            var recipe = _mapper.Map<Recipe>(recipeDto);

            return Ok(_repository.Add(recipe));

        } 

        [AllowAnonymous]
        [HttpGet("registerrecipe/{idVisit}")]
        public IActionResult RegisterRecipe(int idVisit)
        {
            return Ok(_recipeService.CreateModelToRegisterRecipe(idVisit));
        }

        [AllowAnonymous]
        [HttpPut("editrecipe")]
        public IActionResult EditRecipe([FromBody]RecipeDto recipeDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var recipe = _mapper.Map<Recipe>(recipeDto);

            return Ok(_repository.Update(recipe));
        }

        [AllowAnonymous]
        [HttpGet("editrecipe/{id}")]
        public IActionResult EditRecipe(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            return Ok(_recipeService.CreateModelToEditShowRecipe(id));
        }

        [AllowAnonymous]
        [HttpDelete("deleterecipe/{id}")]
        public IActionResult DeleteRecipe(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var recipe = _dbContext.Recipes.FirstOrDefault(x => x.Id == id);

            return Ok(_repository.Delete(recipe));
        }

        [AllowAnonymous]
        [HttpGet("getallrecipes")]
        public IActionResult GetAllRecipes()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var recipes = _repository.GetAll();
            var recipeDtos = _mapper.Map<IList<RecipeDto>>(recipes);
            return Ok(recipeDtos);
        }

        [HttpGet("getrecipe/{visitId}")]
        public IActionResult GetRecipe(int visitId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            return Ok(_recipeService.ShowRecipe(visitId));
        }

        [HttpGet("generaterecipepdf/{id}")]
        public IActionResult GenerateRecipePdf(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            _recipeService.GenerateRecipePdf(id);
            return Ok();
        }

    }
}