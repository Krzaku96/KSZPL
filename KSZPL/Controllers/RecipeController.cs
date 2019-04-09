using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using KSZPL.Api.Dtos.Recipe;
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

        public RecipeController(KSZPLDbContext dbContext, IMapper mapper, IRepository<Recipe> repository)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _repository = repository;
        }

        [AllowAnonymous]
        [HttpPost("registerrecipe")]
        public IActionResult RegisterRecipe([FromBody]RecipeDto recipeDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var recipe = _mapper.Map<Recipe>(recipeDto);

            return Ok(_repository.Add(recipe));

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

        [HttpGet("getrecipe/{id}")]
        public IActionResult GetRecipe(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var recipe = _repository.GetById(id);
            var recipeDto = _mapper.Map<RecipeDto>(recipe);
            return Ok(recipeDto);
        }

    }
}