import { TasksStateType} from '../App';
import {v1} from 'uuid';
import {TaskType} from "../Todolist";
import {AddTodolistType, RemoveTodolistType, todolistId1, todolistId2} from "./todolists-reducer";

export type RemoveTaskType = ReturnType<typeof removeTaskAC>
export type AddTaskType =ReturnType<typeof addTaskAC>
export type ChangeTaskStatusType =ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleType =ReturnType<typeof changeTaskTitleAC>


type ActionsType = RemoveTaskType | AddTaskType | ChangeTaskStatusType | ChangeTaskTitleType | AddTodolistType | RemoveTodolistType

const initialState: TasksStateType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(t => t.id !== action.taskId)
            }
        }
        case "ADD-TASK":{
            let task: TaskType = {id: v1(), title: action.title, isDone: false};
            return {
                ...state, [action.todolistId]: [task, ...state[action.todolistId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map
                (el => el.id === action.id ? {...el, isDone: action.isDone} : el)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map
                (el => el.id === action.id ? {...el, title: action.title} : el)
            }
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState;
        }
        default:
           return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return { type: 'REMOVE-TASK', taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return { type: 'ADD-TASK', title, todolistId} as const
}
export const changeTaskStatusAC = (id: string,isDone: boolean, todolistId: string) => {
    return { type: 'CHANGE-TASK-STATUS', id, isDone, todolistId} as const
}
export const changeTaskTitleAC = (id: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', id, title, todolistId} as const
}
