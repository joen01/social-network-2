import {PhotosType, PostsType, ProfileType} from "../Types/Types";
import {ThunkAction} from "@reduxjs/toolkit";
import {AppStateType} from "src/Redux/Redux-store";
import {usersApi} from "src/Api/UsersApi";
import {profileApi} from "src/Api/ProfileApi";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SET_PHOTO_SUCCESS = "SET_PHOTO_SUCCESS";
const SET_PROFILE_ERROR = "SET_PROFILE_ERROR";



let initialState = {
    posts: [
        {id: 1, message: "Hello, how are you ", like: "like 1"},
        {id: 2, message: "How are you", like: "like 4"},
        {id: 3, message: "How are you ", like: "like 20"},
        {id: 4, message: " :) ", like: "like 6"},
    ] as Array<PostsType>,
    nextId: 5,
    profile: null as ProfileType | null,
    status: "there is not status",
    errorProfile: null as string | null
};
export  type initialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionType): initialStateType => {
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
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        case SET_PROFILE_ERROR: {
            return {...state, errorProfile: action.errorMessages}
        }
        default:
            return state;
    }
};

type ActionType = addPostActionType|setUsersProfileActionType|setStatusActionType|deletePostActionType|setPhotosSuccessActionType|setProfileErrorActionType

type addPostActionType = {
    type: typeof ADD_POST
    values: string
}
type setUsersProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType | null
}
type setStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
type deletePostActionType = {
    type: typeof DELETE_POST
    id: number
}
type setPhotosSuccessActionType = {
    type: typeof SET_PHOTO_SUCCESS
    photos: PhotosType
}
type setProfileErrorActionType = {
    type: typeof SET_PROFILE_ERROR
    errorMessages: string | null
}
export const addPost = (values: string): addPostActionType => ({type: ADD_POST, values})
export const setUsersProfile = (profile: ProfileType | null): setUsersProfileActionType => ({
    type: SET_USER_PROFILE,
    profile
});
export const setStatus = (status: string): setStatusActionType => ({type: SET_STATUS, status});
export const deletePost = (id: number): deletePostActionType => ({type: DELETE_POST, id});
export const setPhotosSuccess = (photos: PhotosType): setPhotosSuccessActionType => ({type: SET_PHOTO_SUCCESS, photos});
export const setProfileError = (errorMessages: string | null): setProfileErrorActionType => ({
    type: SET_PROFILE_ERROR,
    errorMessages
});

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionType>

export const getProfileThunk = (userId: number|null):ThunkType => async (dispatch) => {
    let response = await usersApi.getProfile(userId)
    dispatch(setUsersProfile(response.data))
    ;
}
export const getStatusThunk = (userId: number|null):ThunkType => async (dispatch) => {
    try {
        const response = await profileApi.getStatus(userId);
        dispatch(setStatus(response.data));
    } catch (error) {
        console.error("Ошибка при получении статуса:", error);
    }
};

export const updateStatusThunk = (status: string):ThunkType => async (dispatch) => {
    try {
        const response = await profileApi.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    } catch (e: any) {
        console.error(`ошибка ${e.message}`)

    }
};

export const savePhoto = (file: any):ThunkType => async (dispatch) => {
    try {
        const response = await profileApi.savePhotos(file)
        if (response.data.resultCode === 0) {
            dispatch(setPhotosSuccess(response.data.data.photos))
        }
    } catch (e) {
        console.error("ошибка отправки файла")
    }
};
export const saveProfile = (profile: ProfileType|null):ThunkType => async (dispatch, getState) => {
    try {
        const userId = getState().auth.id
        const response = await profileApi.updateProfile(profile)
        if (response.data.resultCode === 0) {
            dispatch(getProfileThunk(userId))
            dispatch(setProfileError(null))
        } else {
            const errorMessages = response.data.messages[0]
            dispatch(setProfileError(errorMessages))
            return errorMessages; // Возвращаем сообщение об ошибке
        }
    } catch (e) {
        console.error("ошибка отправки файла");
        return "Ошибка отправки данных"; // Возвращаем общее сообщение об ошибке
    }
};

export default profileReducer