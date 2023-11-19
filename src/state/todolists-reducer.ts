import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export let todolistId1 = v1();
export let todolistId2 = v1();


const initialState: TodolistType[] = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
]

export const todolistsReducer = (state: TodolistType[] = initialState, action: TodolistReducerType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id)
        case "ADD-TODOLIST":
            let newTodolist: TodolistType = {id: action.todolistId, title: action.title, filter: 'all'}
            return [newTodolist, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        case 'CHANGE-TODOLIST-FILTER':{
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        }
        default:
            return state

    }
}
type TodolistReducerType = RemoveTodolistType | AddTodolistType | ChangeTodolistType | ChangeFilterType

export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type AddTodolistType = ReturnType<typeof addTodolistAC>
type ChangeTodolistType = ReturnType<typeof changeTodolistAC>
type ChangeFilterType = ReturnType<typeof changeFilterAC>

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id
    } as const
}
export const addTodolistAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        title,
        todolistId: v1()
    } as const
}
export const changeTodolistAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {id, title}
    } as const
}
export const changeFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {id, filter}
    } as const
}