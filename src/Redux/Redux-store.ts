import {combineReducers, configureStore} from "@reduxjs/toolkit";
import profileReducer from "./Profile-reducer";
import dialogsReducer from "./Dialogs-reducer";
import friendsReducer from "./Friends-reducer";
import usersReducer from "./Users-reducer";
import authReducer from "./Auth-reducer";
import appReducer from "./App-reducer";

let RootReducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sadebar: friendsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
})
type RootReducersType = typeof RootReducers
export type AppStateType = ReturnType<RootReducersType>

type PropertiesTypes<T> = T extends {[key: string]:infer U} ? U: never
export  type InferActionType<T extends {[key: string]:( ...args: any[]) => any} > =  ReturnType<PropertiesTypes<T>>
// export  type InferActionType<T> = T extends {[key: string]:infer U} ? U: never

const store = configureStore({
    reducer: RootReducers,
});

// @ts-ignore
window.store = store;


export default store;
