using Luminis.Recipes.Server.Controllers;
using Luminis.Recipes.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Receptenboek.API;
using System.ComponentModel.DataAnnotations;

namespace Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReceptenboekController : RecipesApiController
    {
        private static List<Recipe> Recipes =
        [
            new Recipe { Id = 1, Name = "Pasta", RecipeOwnerId = 03892 },
            new Recipe { Id = 2, Name = "Pizza", RecipeOwnerId = 212 },
            new Recipe { Id = 3, Name = "Salade", RecipeOwnerId = 14523 },
            new Recipe { Id = 4, Name = "Soep", RecipeOwnerId = 78934 },
            new Recipe { Id = 5, Name = "Stamppot", RecipeOwnerId = 78923 }
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

            return Ok(new RecipeDto()
            {
                Id = recipe.Id,
                Name = recipe.Name
            });
        }
    }
}
