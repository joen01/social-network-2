import {authMeApi} from "../Api/API";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
    id: null,
    email: null,
    login: null,
    isLoading: false,
    isAuth: false
};


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload,
            }
        }
        default:
            return state;
    }
};


export const setUserData = (id, email, login, isAuth) => ({type: SET_USER_DATA, payload: {id, email, login, isAuth}});

export const getAuthUserDataThunk = () => (dispatch) => {
        authMeApi.auth()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data;
                    dispatch(setUserData(id, email, login, true))
                }
            })
    }
export const loginThunk = (email,password, rememberMe) => (dispatch) => {

    authMeApi.login(email,password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserDataThunk())
            }
        })
}
export const logoutThunk = () => (dispatch) => {
    authMeApi.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserData(null,null,null, false))
            }
        })
}

export default authReducer