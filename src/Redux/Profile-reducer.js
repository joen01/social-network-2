import {profileApi, usersApi} from "../Api/API";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

let initialState = {
    posts: [
        {id: 1, message: "Hello, how are you ", like: "like 1"},
        {id: 2, message: "How are you", like: "like 4"},
        {id: 3, message: "How are you ", like: "like 20"},
        {id: 4, message: " :) ", like: "like 6"},
    ],
    nextId: 5,
    profile: null,
    status: "there is no status"

};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            const newPost = {id: state.nextId, message: action.values, like: "like 0"};
            return {
                ...state,
                posts: [...state.posts, newPost],
                nextId: state.nextId+1
            };
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        default:
            return state;
    }
};


export const addPost = (values) => ({type: ADD_POST,values})
export const setUsersProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});


export const getProfileThunk = (userId) => (dispatch) => {
    usersApi.getProfile(userId).then(response => {
        dispatch(setUsersProfile(response.data))
    });
}
export const getStatusThunk = (userId) => (dispatch) => {
    profileApi.getStatus(userId)
        .then(response => {
            dispatch(setStatus(response.data))
        });
}
export const updateStatusThunk = (status) => (dispatch) => {
    profileApi.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        });
}

export default profileReducer