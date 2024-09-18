using Luminis.Recipes.Server.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Receptenboek.API.Controllers
{
    [ApiController]
    public class ReceptenboekController : RecipesApiController
    {
        private static List<Recipe> Recipes =
        [
            new Recipe { Id = 1, Name = "Pasta" },
            new Recipe { Id = 2, Name = "Pizza" },
            new Recipe { Id = 3, Name = "Salade" },
            new Recipe { Id = 4, Name = "Soep" },
            new Recipe { Id = 5, Name = "Stamppot" }
        ];

        private readonly ILogger<ReceptenboekController> _logger;

        public ReceptenboekController(ILogger<ReceptenboekController> logger)
        {
            _logger = logger;
        }

        public override async Task<IActionResult> GetRecipeById([FromRoute(Name = "recipeId"), Required] int recipeId)
        {
            _logger.LogInformation("Getting recipe by id {recipeId}", recipeId);
            var recipe = Recipes.FirstOrDefault(r => r.Id == recipeId);
            if (recipe == null)
            {
                _logger.LogWarning("Recipe with id {recipeId} not found", recipeId);
                return NoContent();
            }

            await Task.Delay(10);

            return Ok(recipe);
        }
    }
}
