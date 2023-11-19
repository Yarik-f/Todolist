import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";


type AddItemFormPropsType = {
    onClick: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)


    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.onClick(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    const styleButton ={maxWidth: '38px', maxHeight: '38px', minWidth: '38px', minHeight: '38px'}
    return (
        <div>
            <TextField
                error={!!error}
                size={'small'}
                id="outlined-basic"
                label={error ? error : "Some text"}
                variant="outlined"
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
            />
            {/*<button onClick={addTask}>+</button>*/}
            <Button style={styleButton} variant={'contained'} color={'primary'} onClick={addTask}>+</Button>

        </div>

    );
};

export default AddItemForm;