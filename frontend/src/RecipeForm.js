import React from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import {useForm} from "react-hook-form";
import useInputState from "./hooks/useInputState";
function RecipeForm({ addRecipe }) {

    const {register, handleSubmit} = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Paper style={{ margin: "1rem 0", padding: "0 1rem" }}>
            <form
                onSubmit={e => {
                    e.preventDefault()
                    handleSubmit(onSubmit)
                }}
            >
                <input
                    type='text'
                    placeholder='name'
                    pattern='/^[a-zA-Z]+$/'
                    {...register('name')}
                />
                <input
                    type='text'
                    placeholder='description'
                    pattern='/^[a-zA-Z]+$/'
                    {...register('description')}
                />
                <input
                    type='text'
                    placeholder='ingredients'
                    pattern='/^[a-zA-Z]+$/'
                    {...register('ingredients')}
                />
            </form>
        </Paper>
    );
}
export default RecipeForm;
