import {useState} from "react";
import { v4 as uuid } from 'uuid';

export default initialRecipes => {
    const [recipes, setRecipes] = useState(initialRecipes);
    return {
        recipes,
        addRecipe: (newRecipeName, newRecipeDescription, newRecipeIngredients) => {
            setRecipes([...recipes, {
                id: uuid(),
                name: newRecipeName,
                description: newRecipeDescription,
                ingredients: newRecipeIngredients
            }]);
        },
        removeRecipe: recipeId => {
            //filter out removed recipe
            const updatedRecipes = recipes.filter(recipe => recipe.id !== recipeId);
            //call setRecipes with new recipes array
            setRecipes(updatedRecipes);
        },
        editRecipe: (recipeId, newRecipeName, newRecipeDescription, newRecipeIngredients) => {
            const updatedRecipes = recipes.map(recipe =>
                recipe.id === recipeId ? {
                    ...recipe,
                    name: newRecipeName,
                    description: newRecipeDescription,
                    ingredients: newRecipeIngredients
                } : recipe
            );
            setRecipes(updatedRecipes);
        }
    };
};
