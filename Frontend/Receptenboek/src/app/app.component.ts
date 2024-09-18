import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RecipeDto, RecipesService } from 'luminis-recipe-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Receptenboek';
  recipeId: number = 2;
  recipe?: RecipeDto = undefined;

  public constructor(private recipesService: RecipesService) {
    this.recipesService.getRecipeById(2).subscribe((recipes) => {
      this.recipe = recipes as RecipeDto;
    });
  }

  public getRecipe(recipeId: number) {
    this.recipesService.getRecipeById(recipeId).subscribe((recipes) => {
      this.recipe = recipes as RecipeDto;
    });
  }
}
