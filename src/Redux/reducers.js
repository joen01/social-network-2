import profileReducer from "./Profile-reducer";
import dialogsReducer from "./Dialogs-reducer";
import friendsReducer from "./Friends-reducer";
import {combineReducers} from "@reduxjs/toolkit";
import usersReducer from "./Users-reducer";
import authReducer from "./Auth-reducer";
import appReducer from "./App-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sadebar: friendsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
})



export default reducers