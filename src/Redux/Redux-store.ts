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


const store = configureStore({
    reducer: RootReducers,
});

// @ts-ignore
window.store = store;


export default store;
