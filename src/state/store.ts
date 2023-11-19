import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

const rootReducers = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

/*type AppRootState = {
    todolists: TodolistType[],
    tasks: TasksStateType
}*/

export type AppRootState = ReturnType<typeof rootReducers>
export const store = createStore(rootReducers)

// @ts-ignore
window.store = store