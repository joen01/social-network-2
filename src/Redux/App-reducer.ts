import {getAuthUserDataThunk} from "../Redux/Auth-reducer";
import {ThunkAction} from "@reduxjs/toolkit";
import {AppStateType, InferActionType} from "src/Redux/Redux-store";


let initialState = {
    initialized: false
};
export type InitialStateType = typeof initialState


const appReducer = (state = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case "SN/APP/INITIALIZED_SUCCESS": {
            return {
                ...state,
                initialized: true,
            }
        }
        default:
            return state;
    }
}

export type AppActionType = InferActionType<typeof appActions>

export const appActions = {
    initializedSuccess: () => ({type: "SN/APP/INITIALIZED_SUCCESS"} as const)
}


type ThunkType = ThunkAction<void, AppStateType, unknown, AppActionType>

export const initializedApp = (): ThunkType => (dispatch) => {
    dispatch(getAuthUserDataThunk())
}

export default appReducer


// import { getAuthUserDataThunk } from "./Auth-reducer";
//
// const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";
//
// interface InitialStateType {
//     initialized: boolean;
// }
//
// let initialState: InitialStateType = {
//     initialized: false,
// };
//
// type ActionType =
//     | ReturnType<typeof initializedSuccess>;
//
// const appReducer = (state = initialState, action: ActionType): InitialStateType => {
//     switch (action.type) {
//         case INITIALIZED_SUCCESS: {
//             return {
//                 ...state,
//                 initialized: true,
//             };
//         }
//         default:
//             return state;
//     }
// };
//
// export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });
//
// export const initializedApp = () => (dispatch: any) => {
//     dispatch(getAuthUserDataThunk());
// };
//
// export default appReducer;