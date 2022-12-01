import React from "react";
import useInputState from "./hooks/useInputState";
import TextField from "@material-ui/core/TextField";

function EditRecipeForm({id, name, description, ingredients, editRecipe, toggleEditForm}) {
    const [nameValue, nameHandleChange, nameReset] = useInputState("");
    const [descriptionValue, descriptionHandleChange, descriptionReset] = useInputState("");
    const [ingredientsValue, ingredientsHandleChange, ingredientsReset] = useInputState([]);
    debugger;
    return (
        <form
            // onSubmit={e => {
            //     e.preventDefault();
            //     editRecipe(id, value);
            //     reset();
            //     toggleEditForm();
            // }}
            style={{marginLeft: "1rem", width: "50%"}}
        >
            <TextField
                margin='normal'
                value={nameValue}
                pattern='/^[a-zA-Z]+$/'
                onChange={nameHandleChange}
                fullWidth
                autoFocus
            />
            <TextField
                margin='normal'
                value={descriptionValue}
                pattern='/^[a-zA-Z]+$/'
                onChange={descriptionHandleChange}
                fullWidth
                autoFocus
            />
            <TextField
                margin='normal'
                value={ingredientsValue}
                pattern='/^[a-zA-Z]+$/'
                onChange={ingredientsHandleChange}
                fullWidth
                autoFocus
            />
        </form>
    );
}

export default EditRecipeForm;
