import {ResultCodeCaptcha, ResultCodeEnum} from "src/Api/API";
import {appActions, AppActionType} from "./App-reducer";
import {BaseThunkType, InferActionType} from "src/Redux/Redux-store";
import {authMeApi} from "src/Api/AuthMeApi";
import {securityApi} from "src/Api/SecurityApi";

let initialState = {
    id: null as number |null,
    email: null as string |null,
    login: null as string |null,
    isLoading: false,
    isAuth: false,
    errorAuth: null as string |null,
    captchaUrl: null as string |null
};

const authReducer = (state = initialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case "SN/AUTH/SET_USER_DATA":
        case "SN/AUTH/SET_CAPTCHA_URL" : {
            return {
                ...state,
                ...action.payload,
            }
        }
        case "SN/AUTH/SET_ERROR": {
            return {
                ...state,
                errorAuth: action.payload,
            }
        }
        default:
            return state;
    }
};

export const authActions = {
    setUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean, captchaUrl: string | null, errorAuth: string | null) => ({
        type: "SN/AUTH/SET_USER_DATA", payload: {id, email, login, isAuth, captchaUrl, errorAuth}} as const),
    setAuthError: (errorMessages: string | null) => ({type: "SN/AUTH/SET_ERROR", payload: errorMessages} as const),
    setCaptchaUrl: (captchaUrl: string) => ({type: "SN/AUTH/SET_CAPTCHA_URL", payload: {captchaUrl}} as const),
}

export const getAuthUserDataThunk = (): ThunkType => async (dispatch) => {
    const meData = await authMeApi.auth()
    if (meData.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = meData.data;
        dispatch(authActions.setUserData(id, email, login, true, null, null))
    }
    dispatch(appActions.initializedSuccess())
};
export const loginThunk = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    const data = await authMeApi.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserDataThunk())
    } else if (data.resultCode === ResultCodeCaptcha.Captcha) {
        dispatch(getCaptchaUrlThunk())
        let errorMessages = data.messages[0]
        dispatch(authActions.setAuthError(errorMessages))
    } else {
        let errorMessages = data.messages.length > 0 ? data.messages[0] : "Some Error"
        dispatch(authActions.setAuthError(errorMessages))
    }
};
export const getCaptchaUrlThunk = (): ThunkType => async (dispatch) => {
    const response = await securityApi.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(authActions.setCaptchaUrl(captchaUrl))
};
export const logoutThunk = (): ThunkType => async (dispatch) => {
    const data = await authMeApi.logout()
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(authActions.setUserData(null, null, null, false, null, null))
    }
};

export default authReducer

type InitialStateType = typeof initialState;
export type AuthActionType = InferActionType<typeof authActions>
type ThunkType = BaseThunkType<AuthActionType|AppActionType>


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