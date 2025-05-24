import {getAuthUserDataThunk} from "../Redux/Auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

export type initialStateType = {
    initialized: boolean
};

let initialState:initialStateType = {
    initialized: false
};


const appReducer = (state = initialState, action:any):initialStateType => {
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


export type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
};

export const initializedSuccess = ():initializedSuccessActionType => ({type: INITIALIZED_SUCCESS});

export const initializedApp = () => (dispatch:any) => {
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