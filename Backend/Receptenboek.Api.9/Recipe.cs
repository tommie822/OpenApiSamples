namespace Receptenboek.API
{
    public class Recipe
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int RecipeOwnerId { get; set; }
    }
}
