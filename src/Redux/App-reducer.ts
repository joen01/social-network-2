import {getAuthUserDataThunk} from "../Redux/Auth-reducer";
import {ThunkAction} from "@reduxjs/toolkit";
import {AppStateType} from "src/Redux/Redux-store";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

export type InitialStateType = {
    initialized: boolean
};

let initialState: InitialStateType = {
    initialized: false
};


const appReducer = (state = initialState, action: InitializedSuccessActionType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true,
            }
        }
        default:
            return state;
    }
};

export type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
};

export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS});

type ThunkType = ThunkAction<void, AppStateType, unknown, InitializedSuccessActionType>

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