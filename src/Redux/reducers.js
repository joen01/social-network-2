import profileReducer from "./Profile-reducer";
import dialogsReducer from "./Dialogs-reducer";
import friendsReducer from "./Friends-reducer";
import {combineReducers} from "@reduxjs/toolkit";
import usersReducer from "./Users-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sadebar: friendsReducer,
    usersPage: usersReducer
})



export default reducers