import {updateObjectInArray} from "../utils/object-helpers";
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

type InitialStateType = typeof initialState
type ActionType = InferActionType<typeof userActions>
type DispatchType = Dispatch<ActionType>

const usersReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW': {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        }
        case 'UNFOLLOW': {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        }
        case 'SET_USERS': {
            return {...state, users: action.users}
        }
        case 'SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.totalCount}
        }
        case 'TOGGLE_IS_LOADING': {
            return {...state, isLoading: action.isLoading}
        }
        case 'TOGGLE_IS_DISABLED': {
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
    follow: (userId: number) => ({type: "FOLLOW", userId} as const),
    unfollow: (userId: number) => ({type: "UNFOLLOW", userId} as const),
    setUsers: (users: Array<UserType>) => ({type: "SET_USERS", users} as const),
    setCurrentPage: (currentPage: number) => ({type: "SET_CURRENT_PAGE", currentPage} as const),
    setTotalUsersCount: (totalCount: number) => ({type: "SET_TOTAL_USERS_COUNT", totalCount} as const),
    toggleIsLoading: (isLoading: boolean) => ({type: "TOGGLE_IS_LOADING", isLoading} as const),
    toggleIsDisabled: (progress: boolean, userId: number) => ({type: "TOGGLE_IS_DISABLED", progress, userId} as const),
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