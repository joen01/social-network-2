import {usersApi} from "src/Api/API";
import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../Types/Types";
import {Dispatch, ThunkAction} from "@reduxjs/toolkit";
import {AppStateType} from "src/Redux/Redux-store";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_LOADING = "TOGGLE_IS_LOADING";
const TOGGLE_IS_DISABLED = "TOGGLE_IS_DISABLED";


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isLoading: true,
    followingInProgress: [] as Array<number> // array user id
};

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalCount}
        }
        case TOGGLE_IS_LOADING: {
            return {...state, isLoading: action.isLoading}
        }
        case TOGGLE_IS_DISABLED: {
            return {
                ...state,
                followingInProgress: action.progress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
};
type ActionType = FollowActionType | UnfollowActionType | SetUsersActionType | SetCurrentPageActionType |
    SetTotalUsersCountActionType | ToggleIsLoadingActionType | ToggleIsDisabledActionType

type FollowActionType = {
    type: typeof FOLLOW
    userId: number
}
export const follow = (userId: number): FollowActionType => ({type: FOLLOW, userId});

type UnfollowActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollow = (userId: number): UnfollowActionType => ({type: UNFOLLOW, userId});

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users});

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
    type: SET_CURRENT_PAGE,
    currentPage
});

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalCount: number
}
export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalCount
});

type ToggleIsLoadingActionType = {
    type: typeof TOGGLE_IS_LOADING
    isLoading: boolean
}
export const toggleIsLoading = (isLoading: boolean): ToggleIsLoadingActionType => ({
    type: TOGGLE_IS_LOADING,
    isLoading
});

type ToggleIsDisabledActionType = {
    type: typeof TOGGLE_IS_DISABLED
    progress: boolean
    userId: number
}
export const toggleIsDisabled = (progress: boolean, userId: number): ToggleIsDisabledActionType => ({
    type: TOGGLE_IS_DISABLED,
    progress,
    userId
});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>
type DispatchType = Dispatch<ActionType>

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsLoading(true));
        dispatch(setCurrentPage(page));
        let data = await usersApi.getUsers(page, pageSize)
        dispatch(toggleIsLoading(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount))
    }
};

const _followUnFollowFlow = async (dispatch: DispatchType, userId: number, rest: any, creator: (user: number) => FollowActionType | UnfollowActionType) => {
    dispatch(toggleIsDisabled(true, userId))
    let data = await usersApi.followUsers(userId, rest)
    if (data.resultCode === 0) {
        dispatch(creator(userId))
    }
    dispatch(toggleIsDisabled(false, userId))
}

export const followThunk = (userId: number, rest: any): ThunkType => {
    return async (dispatch) => {
        await _followUnFollowFlow(dispatch, userId, rest, follow)
    }
};

export const unfollowThunk = (userId: number, rest: any): ThunkType => {
    return async (dispatch) => {
        await _followUnFollowFlow(dispatch, userId, rest, unfollow)
    }
};

export default usersReducer