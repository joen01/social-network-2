import {PhotosType, PostsType, ProfileType} from "../Types/Types";
import {ThunkAction} from "@reduxjs/toolkit";
import {AppStateType, InferActionType} from "src/Redux/Redux-store";
import {profileApi} from "src/Api/ProfileApi";

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

const profileReducer = (state = initialState, action: ProfileActionType): initialStateType => {
    switch (action.type) {
        case "SN/PROFILE/ADD-POST": {
            const newPost = {id: state.nextId, message: action.values, like: "like 0"};
            return {
                ...state,
                posts: [...state.posts, newPost],
                nextId: state.nextId + 1
            };
        }
        case "SN/PROFILE/SET_USER_PROFILE": {
            return {...state, profile: action.profile}
        }
        case "SN/PROFILE/SET_STATUS": {
            return {...state, status: action.status}
        }
        case "SN/PROFILE/DELETE_POST": {
            return {...state, posts: state.posts.filter(p => p.id !== action.id)}
        }
        case "SN/PROFILE/SET_PHOTO_SUCCESS": {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        case "SN/PROFILE/SET_PROFILE_ERROR": {
            return {...state, errorProfile: action.errorMessages}
        }
        default:
            return state;
    }
};

export const profileAction = {
    addPost: (values: string) => ({type: "SN/PROFILE/ADD-POST", values} as const),
    setUsersProfile: (profile: ProfileType | null) => ({type: "SN/PROFILE/SET_USER_PROFILE", profile} as const),
    setStatus: (status: string) => ({type: "SN/PROFILE/SET_STATUS", status} as const),
    deletePost: (id: number) => ({type: "SN/PROFILE/DELETE_POST", id} as const),
    setPhotosSuccess: (photos: PhotosType) => ({type: "SN/PROFILE/SET_PHOTO_SUCCESS", photos} as const),
    setProfileError: (errorMessages: string | null) => ({type: "SN/PROFILE/SET_PROFILE_ERROR", errorMessages} as const)
}

export const getProfileThunk = (userId: number | null): ThunkType => async (dispatch) => {
    let response = await profileApi.getProfile(userId)
    dispatch(profileAction.setUsersProfile(response.data));
}
export const getStatusThunk = (userId: number | null): ThunkType => async (dispatch) => {
    try {
        const response = await profileApi.getStatus(userId);
        dispatch(profileAction.setStatus(response.data));
    } catch (error) {
        console.error("Ошибка при получении статуса:", error);
    }
};
export const updateStatusThunk = (status: string): ThunkType => async (dispatch) => {
    try {
        const response = await profileApi.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(profileAction.setStatus(status))
        }
    } catch (e: any) {
        console.error(`ошибка ${e.message}`)
    }
};
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    try {
        const response = await profileApi.savePhotos(file)
        if (response.data.resultCode === 0) {
            dispatch(profileAction.setPhotosSuccess(response.data.data.photos))
        }
    } catch (e) {
        console.error("ошибка отправки файла")
    }
};
export const saveProfile = (profile: ProfileType | null): ThunkType => async (dispatch, getState) => {
    try {
        const userId = getState().auth.id
        const response = await profileApi.updateProfile(profile)
        if (response.data.resultCode === 0) {
            dispatch(getProfileThunk(userId))
            dispatch(profileAction.setProfileError(null))
        } else {
            const errorMessages = response.data.messages[0]
            dispatch(profileAction.setProfileError(errorMessages))
            return errorMessages; // Возвращаем сообщение об ошибке
        }
    } catch (e) {
        console.error("ошибка отправки файла");
        return "Ошибка отправки данных"; // Возвращаем общее сообщение об ошибке
    }
};

export default profileReducer

export  type initialStateType = typeof initialState
export type ProfileActionType = InferActionType<typeof profileAction>
type ThunkType = ThunkAction<void, AppStateType, unknown, ProfileActionType>
// type ThunkType = BaseThunkType<ProfileActionType>
