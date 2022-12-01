import React from "react";
import Recipe from "./Recipe";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

function RecipeList({ recipes, removeRecipe, editRecipe }) {
    if (recipes.length)
        return (
            <Paper>
                <List>
                    {recipes.map((recipe, i) => (
                        // To add a key to a fragment, we have to use the long-hand version
                        // rather than <> </>, we have to use <React.Fragment>
                        <React.Fragment key={i}>
                            <Recipe
                                {...recipe}
                                key={recipe.id}
                                removeRecipe={removeRecipe}
                                editRecipe={editRecipe}
                            />
                            {i < recipes.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
        );
    return null;
}
export default RecipeList;
