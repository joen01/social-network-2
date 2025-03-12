import {authMeApi} from "../Api/API";
import {initializedSuccess} from "./App-reducer";

const SET_USER_DATA = "SET_USER_DATA";
const SET_ERROR = "SET_ERROR";

let initialState = {
    id: null,
    email: null,
    login: null,
    isLoading: false,
    isAuth: false,
    errorAuth: null
};


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
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


export const setUserData = (id, email, login, isAuth) => ({type: SET_USER_DATA, payload: {id, email, login,isAuth }});
export const setAuthError = (errorMessages) => ({type: SET_ERROR, payload: errorMessages});

export const getAuthUserDataThunk = () => (dispatch) => {
        authMeApi.auth()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data;
                    dispatch(setUserData(id, email, login,true))
                }
                dispatch(initializedSuccess())
            })
    }
export const loginThunk = (email,password, rememberMe) => (dispatch) => {
    authMeApi.login(email,password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserDataThunk())
            }
            else {
                let errorMessages = response.data.messages.length>0 ? response.data.messages[0]: "Some Error"
                dispatch(setAuthError(errorMessages))
            }
        })
}
export const logoutThunk = () => (dispatch) => {
    authMeApi.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserData(null, null, null,false))
            }
        })
}

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