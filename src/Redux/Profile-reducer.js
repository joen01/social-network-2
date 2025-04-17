import {profileApi, usersApi} from "../Api/API";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SET_PHOTO_SUCCESS = "SET_PHOTO_SUCCESS";


let initialState = {
    posts: [
        {id: 1, message: "Hello, how are you ", like: "like 1"},
        {id: 2, message: "How are you", like: "like 4"},
        {id: 3, message: "How are you ", like: "like 20"},
        {id: 4, message: " :) ", like: "like 6"},
    ],
    nextId: 5,
    profile: null,
    status: "there is not status"

};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            const newPost = {id: state.nextId, message: action.values, like: "like 0"};
            return {
                ...state,
                posts: [...state.posts, newPost],
                nextId: state.nextId + 1
            };
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        case DELETE_POST: {
            return {...state, posts: state.posts.filter(p => p.id !== action.id)}
        }
        case SET_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        default:
            return state;
    }
};


export const addPost = (values) => ({type: ADD_POST, values})
export const setUsersProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const deletePost = (id) => ({type: DELETE_POST, id});
export const setPhotosSuccess = (photos) => ({type: SET_PHOTO_SUCCESS, photos});


export const getProfileThunk = (userId) => async (dispatch) => {
    let response = await usersApi.getProfile(userId)
    dispatch(setUsersProfile(response.data))
    ;
}
export const getStatusThunk = (userId) => async (dispatch) => {
    try {
        const response = await profileApi.getStatus(userId);
        dispatch(setStatus(response.data));
    } catch (error) {
        console.error("Ошибка при получении статуса:", error);
    }
};

export const updateStatusThunk = (status) => async (dispatch) => {
    try {
        const response = await profileApi.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    } catch (e) {
        console.error("ошибкаа отправки статуса")
    }
};

export const savePhoto = (file) => async (dispatch) => {
    try {
        const response = await profileApi.savePhotos(file)
        if (response.data.resultCode === 0) {
            dispatch(setPhotosSuccess(response.data.data.photos))
        }
    } catch (e) {
        console.error("ошибка отправки файла")
    }
};

export default profileReducer