import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import ButtonAppBar from "./Header";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchTodolists] = useReducer(todolistsReducer,[
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });

    function addTodolist(title: string) {
        /*let todolistId = v1()
        let todolist: TodolistType = {id: todolistId, title: title, filter: 'all'}
        setTodolists([todolist, ...todolists])
        console.log('add')
        setTasks({...tasks, [todolistId]: []})*/
        const action = addTodolistAC(title)
        dispatchTasks(action)
        dispatchTodolists(action)
    }
    function removeTodolist(id: string) {
        /*// засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        setTodolists(todolists.filter(tl => tl.id != id));
        // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});*/
        const action = removeTodolistAC(id)
        dispatchTodolists(action)
        dispatchTasks(action)
    }
    const updateTodolist = (todolistsId: string, newTitle: string) => {
        /* console.log(newTitle)
         setTodolists(todolists.map(el => el.id === todolistsId ? {...el, title: newTitle} : el))*/
        dispatchTodolists(changeTodolistAC(todolistsId, newTitle))
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        /*let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }*/
        dispatchTodolists(changeFilterAC(todolistId, value))
    }

    function removeTask(id: string, todolistId: string) {
        /*//достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
        tasks[todolistId] = todolistTasks.filter(t => t.id != id);
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});*/
        dispatchTasks(removeTaskAC(id, todolistId))
    }
    function addTask(title: string, todolistId: string) {
        /*let task = {id: v1(), title: title, isDone: false};
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
        tasks[todolistId] = [task, ...todolistTasks];
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});*/
        dispatchTasks(addTaskAC(title, todolistId))
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
        dispatchTasks(changeTaskStatusAC(id, isDone, todolistId))
    }
    const updateTitle = (todolistId: string, taskId: string, newTitle: string) => {
        console.log(newTitle)
        /*setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title: newTitle} : el)})*/
        dispatchTasks(changeTaskTitleAC(taskId, newTitle, todolistId))
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

export default App;
