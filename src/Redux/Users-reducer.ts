import {updateObjectInArray} from "src/utils/object-helpers";
import {UserType} from "../Types/Types";
import {Dispatch} from "@reduxjs/toolkit";
import {InferActionType, BaseThunkType} from "src/Redux/Redux-store";
import {usersApi} from "src/Api/UsersApi";


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isLoading: true,
    followingInProgress: [] as Array<number> // array user id
};

const usersReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SN/USERS/FOLLOW": {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        }
        case "SN/USERS/UNFOLLOW": {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        }
        case "SN/USERS/SET_USERS": {
            return {...state, users: action.users}
        }
        case "SN/USERS/SET_CURRENT_PAGE": {
            return {...state, currentPage: action.currentPage}
        }
        case "SN/USERS/SET_TOTAL_USERS_COUNT" : {
            return {...state, totalUsersCount: action.totalCount}
        }
        case "SN/USERS/TOGGLE_IS_LOADING": {
            return {...state, isLoading: action.isLoading}
        }
        case "SN/USERS/TOGGLE_IS_DISABLED": {
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

export const userActions = {
    follow: (userId: number) => ({type: "SN/USERS/FOLLOW", userId} as const),
    unfollow: (userId: number) => ({type: "SN/USERS/UNFOLLOW", userId} as const),
    setUsers: (users: Array<UserType>) => ({type: "SN/USERS/SET_USERS", users} as const),
    setCurrentPage: (currentPage: number) => ({type: "SN/USERS/SET_CURRENT_PAGE", currentPage} as const),
    setTotalUsersCount: (totalCount: number) => ({type: "SN/USERS/SET_TOTAL_USERS_COUNT", totalCount} as const),
    toggleIsLoading: (isLoading: boolean) => ({type: "SN/USERS/TOGGLE_IS_LOADING", isLoading} as const),
    toggleIsDisabled: (progress: boolean, userId: number) => ({type: "SN/USERS/TOGGLE_IS_DISABLED", progress, userId} as const),
}

export const requestUsers = (page: number, pageSize: number): BaseThunkType<ActionType> => {
    return async (dispatch) => {
        dispatch(userActions.toggleIsLoading(true));
        dispatch(userActions.setCurrentPage(page));
        let data = await usersApi.getUsers(page, pageSize)
        dispatch(userActions.toggleIsLoading(false));
        dispatch(userActions.setUsers(data.items));
        dispatch(userActions.setTotalUsersCount(data.totalCount))
    }
};
const _followUnFollowFlow = async (dispatch: DispatchType, userId: number, rest: "post" | "delete", creator: (user: number) => ActionType) => {
    dispatch(userActions.toggleIsDisabled(true, userId))
    let data = await usersApi.followUsers(userId, rest)
    if (data.resultCode === 0) {
        dispatch(creator(userId))
    }
    dispatch(userActions.toggleIsDisabled(false, userId))
}
export const followThunk = (userId: number, rest: "post" | "delete"): BaseThunkType<ActionType>  => {
    return async (dispatch) => {
        await _followUnFollowFlow(dispatch, userId, rest, userActions.follow)
    }
};
export const unfollowThunk = (userId: number, rest: "post" | "delete"): BaseThunkType<ActionType>  => {
    return async (dispatch) => {
        await _followUnFollowFlow(dispatch, userId, rest, userActions.unfollow)
    }
};

export default usersReducer

type InitialStateType = typeof initialState
type ActionType = InferActionType<typeof userActions>
type DispatchType = Dispatch<ActionType>
