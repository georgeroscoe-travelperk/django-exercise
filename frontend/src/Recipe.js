import React from "react";
import useToggleState from "./hooks/useToggleState";
import EditRecipeForm from "./EditRecipeForm";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

function Recipe({ id, name, description, ingredients, removeRecipe, editRecipe }) {
    const [isEditing, toggle] = useToggleState(false);

    return (
        <ListItem style={{ height: "64px" }}>
            {isEditing ? (
                <EditRecipeForm
                    editRecipe={editRecipe}
                    id={id}
                    name={name}
                    description={description}
                    ingredients={ingredients}
                    toggleEditForm={toggle}
                />
            ) : (
                <>
                        {description}
                    <ListItemSecondaryAction>
                        <IconButton aria-label='Delete' onClick={() => removeRecipe(id)}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton aria-label='Edit' onClick={toggle}>
                            <EditIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </>
            )}
        </ListItem>
    );
}

export default Recipe;
