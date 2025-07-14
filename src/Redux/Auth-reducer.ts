import {authMeApi, securityApi, ResultCodeEnum, ResultCodeCaptcha} from "src/Api/API";
import {initializedSuccess, InitializedSuccessActionType} from "./App-reducer";
import {ThunkAction} from "@reduxjs/toolkit";
import {AppStateType} from "src/Redux/Redux-store";

const SET_USER_DATA = "samurai-network/auth/SET_USER_DATA";
const SET_ERROR = "samurai-network/auth/SET_ERROR";
const SET_CAPTCHA_URL = "samurai-network/auth/SET_CAPTCHA_URL";


type initialStateType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isLoading: boolean,
    isAuth: boolean,
    errorAuth: string | null,
    captchaUrl: string | null
};
let initialState: initialStateType = {
    id: null,
    email: null,
    login: null,
    isLoading: false,
    isAuth: false,
    errorAuth: null,
    captchaUrl: null
};


const authReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_URL : {
            return {
                ...state,
                ...action.payload,
            }
        }
        case SET_ERROR: {
            return {
                ...state,
                errorAuth: action.payload,
            }
        }
        default:
            return state;
    }
};


type ActionType = setUserDataActionType | setAuthErrorActionType | setCaptchaUrlActionType|InitializedSuccessActionType

type setUserDataActionTypePayload = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    errorAuth: string | null,
    captchaUrl: string | null
}
type setUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: setUserDataActionTypePayload
};
export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean, captchaUrl: string | null, errorAuth: string | null): setUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {id, email, login, isAuth, captchaUrl, errorAuth}
});

type setAuthErrorActionType = {
    type: typeof SET_ERROR,
    payload: string | null
}
export const setAuthError = (errorMessages: string | null): setAuthErrorActionType => ({
    type: SET_ERROR, payload: errorMessages
});

type setCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA_URL,
    payload: { captchaUrl: string }
}
export const setCaptchaUrl = (captchaUrl: string): setCaptchaUrlActionType => ({
    type: SET_CAPTCHA_URL,
    payload: {captchaUrl}
});


type ThunkType = ThunkAction<void, AppStateType, unknown, ActionType>

export const getAuthUserDataThunk = (): ThunkType => async (dispatch) => {
    const meData = await authMeApi.auth()
    if (meData.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = meData.data;
        dispatch(setUserData(id, email, login, true, null, null))
    }
    dispatch(initializedSuccess())
};

export const loginThunk = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    const data = await authMeApi.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserDataThunk())
    } else if (data.resultCode === ResultCodeCaptcha.Captcha) {
        dispatch(getCaptchaUrlThunk())
        let errorMessages = data.messages[0]
        dispatch(setAuthError(errorMessages))
    } else {
        let errorMessages = data.messages.length > 0 ? data.messages[0] : "Some Error"
        dispatch(setAuthError(errorMessages))
    }
};
export const getCaptchaUrlThunk = (): ThunkType => async (dispatch) => {
    const response = await securityApi.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(setCaptchaUrl(captchaUrl))
};

export const logoutThunk = (): ThunkType => async (dispatch) => {
    const data = await authMeApi.logout()
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(setUserData(null, null, null, false, null, null))
    }
};

export default authReducer


// import {authMeApi} from "../Api/API";
//
// const SET_USER_DATA = "SET_USER_DATA";
// const SET_ERROR = "SET_ERROR";
//
// let initialState = {
//     id: null,
//     email: null,
//     login: null,
//     isLoading: false,
//     isAuth: false,
//     errorAuth:null
// };
//
//
// const authReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case SET_USER_DATA: {
//             return {
//                 ...state,
//                 ...action.payload,
//             }
//         }
//         case SET_ERROR: {
//             return {
//                 ...state,
//                 errorAuth: action.payload,
//             }
//         }
//         default:
//             return state;
//     }
// };
//
//
// export const setUserData = (id, email, login, isAuth) => ({type: SET_USER_DATA, payload: {id, email, login, isAuth}});
// export const setAuthError = (errorMessage) => ({type: SET_ERROR, payload: errorMessage});
//
// export const getAuthUserDataThunk = () => (dispatch) => {
//     authMeApi.auth()
//         .then(response => {
//             if (response.data.resultCode === 0) {
//                 let {id, email, login} = response.data.data;
//                 dispatch(setUserData(id, email, login, true))
//             }
//         })
// }
// export const loginThunk = (email,password, rememberMe) => (dispatch) => {
//
//     authMeApi.login(email,password, rememberMe)
//         .then(response => {
//             if (response.data.resultCode === 0) {
//                 dispatch(getAuthUserDataThunk())
//             }
//             else {
//                 let errorMessage = response.data.messages.length > 0 ? response.data.messages[0] : "SOME ERROR"
//                 dispatch(setAuthError(errorMessage))
//             }
//         })
// }
// export const logoutThunk = () => (dispatch) => {
//     authMeApi.logout()
//         .then(response => {
//             if (response.data.resultCode === 0) {
//                 dispatch(setUserData(null,null,null, false))
//             }
//         })
// }
//
// export default authReducer