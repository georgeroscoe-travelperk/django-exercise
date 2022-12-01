import {useEffect} from "react";
import RecipeList from "./RecipeList";
import RecipeForm from "./RecipeForm";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import useRecipeState from "./hooks/useRecipeState";

function RecipeApp() {
    const initialRecipes = JSON.parse(window.localStorage.getItem("recipes") || "[]");
    const {recipes, addRecipe, removeRecipe, editRecipe} = useRecipeState(
        initialRecipes
    );

    useEffect(() => {
        window.localStorage.setItem("recipes", JSON.stringify(recipes));
    }, [recipes]);

    return (
        <Paper
            style={{
                padding: 0,
                margin: 0,
                height: "100vh",
                backgroundColor: "#fafafa"
            }}
            elevation={0}
        >
            <AppBar color='primary' position='static' style={{height: "64px"}}>
                <Toolbar>
                    <Typography color='inherit'>RECIPES WITH HOOKS</Typography>
                </Toolbar>
            </AppBar>
            <Grid container justify='center' style={{marginTop: "1rem"}}>
                <Grid item xs={11} md={8} lg={4}>
                    <RecipeForm addRecipe={addRecipe}/>
                    <RecipeList
                        recipes={recipes}
                        removeRecipe={removeRecipe}
                        editRecipe={editRecipe}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}
export default RecipeApp;
