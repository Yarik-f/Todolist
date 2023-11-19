import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import AddItemForm from "./AddItemForm";
import ButtonAppBar from "./Header";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {


    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)


    function addTodolist(title: string) {
        /*let todolistId = v1()
        let todolist: TodolistType = {id: todolistId, title: title, filter: 'all'}
        setTodolists([todolist, ...todolists])
        console.log('add')
        setTasks({...tasks, [todolistId]: []})*/
        const action = addTodolistAC(title)
        dispatch(action)
    }
    function removeTodolist(id: string) {
        /*// засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        setTodolists(todolists.filter(tl => tl.id != id));
        // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});*/
        const action = removeTodolistAC(id)
        dispatch(action)
    }
    const updateTodolist = (todolistsId: string, newTitle: string) => {
        /* console.log(newTitle)
         setTodolists(todolists.map(el => el.id === todolistsId ? {...el, title: newTitle} : el))*/
        dispatch(changeTodolistAC(todolistsId, newTitle))
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        /*let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }*/
        dispatch(changeFilterAC(todolistId, value))
    }

    function removeTask(id: string, todolistId: string) {
        /*//достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
        tasks[todolistId] = todolistTasks.filter(t => t.id != id);
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});*/
        dispatch(removeTaskAC(id, todolistId))
    }
    function addTask(title: string, todolistId: string) {
        /*let task = {id: v1(), title: title, isDone: false};
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
        tasks[todolistId] = [task, ...todolistTasks];
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});*/
        dispatch(addTaskAC(title, todolistId))
    }
    function changeStatus(id: string, isDone: boolean, todolistId: string) {
       /* //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // найдём нужную таску:
        let task = todolistTasks.find(t => t.id === id);
        //изменим таску, если она нашлась
        if (task) {
            task.isDone = isDone;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks});
        }*/
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    }
    const updateTitle = (todolistId: string, taskId: string, newTitle: string) => {
        console.log(newTitle)
        /*setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title: newTitle} : el)})*/
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    }



    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm onClick={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        updateTitle={updateTitle}
                                        updateTodolist={updateTodolist}
                                    />
                                </Paper>

                            </Grid>
                        })
                    }
                </Grid>

            </Container>
        </div>
    );
}

export default AppWithRedux;
