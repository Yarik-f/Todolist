import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import CheckBox from "./CheckBox";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTitle: (todolistId: string, taskId: string, newTitle: string) => void
    updateTodolist: (todolistsId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {


    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const updateTodolistHandler = (newTitle: string) => {
        props.updateTodolist(props.id, newTitle)
    }


    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const updateTitleHandler = (tID: string, newTitle: string) => {
        props.updateTitle(props.id, tID, newTitle)

    }

    const onChangeHandler = (id: string, isDone: boolean) => {
        props.changeTaskStatus(id, isDone, props.id);

    }



    return(
    <div>
        <div style={{display: 'flex'}}>
            <h3><EditableSpan oldTitle={props.title} onClick={updateTodolistHandler}/></h3>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </div>

        <AddItemForm onClick={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)



                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <CheckBox onChange={(isDone) => onChangeHandler(t.id, isDone)} checked={t.isDone}/>
                        <EditableSpan oldTitle={t.title} onClick={(newTitle) => updateTitleHandler(t.id, newTitle)}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            {/*<button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>*/}
            <Button variant={props.filter === 'all' ? "outlined" : "contained"} color="success"  onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? "outlined" : "contained"} color="primary" onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'completed' ? "outlined" : "contained"} color="error"  onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
    )
}


