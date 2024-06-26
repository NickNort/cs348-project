import { Router } from 'express';
import * as RecipeController from '../controllers/recipe_controller.js';

const recipeRouter = Router();
const uri = '/recipes';

recipeRouter.post(`${uri}/create`, RecipeController.createRecipe);
recipeRouter.get(uri, RecipeController.getRecipes);
recipeRouter.get(`${uri}/getRecipe`, RecipeController.getRecipe);
recipeRouter.get(`${uri}/getRecipesSimple`, RecipeController.getRecipesSimple);
recipeRouter.get(`${uri}/getRecipeSimple`, RecipeController.getRecipeSimple);
recipeRouter.get(uri, RecipeController.getRecipes);
recipeRouter.delete(uri, RecipeController.deleteRecipe);
recipeRouter.put(uri, RecipeController.updateRecipe);
recipeRouter.get(`${uri}/getByCategory`, RecipeController.getRecipesByCategory);
recipeRouter.get(`${uri}/getRecipesByCategorySimple`, RecipeController.getRecipesByCategorySimple);

export default recipeRouter;