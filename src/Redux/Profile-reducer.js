import {profileApi, usersApi} from "../Api/API";

const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
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
    newPostText: " Hello ",
    profile: null,
    status: "there is no status"

};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            const newPost = {message: state.newPostText, lake: "like 0"};
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ""
            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
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


export const addPost = () => ({type: ADD_POST})
export const updateNewPostText = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text});
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