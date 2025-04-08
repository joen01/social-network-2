import {usersApi} from "../Api/API";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_LOADING = "TOGGLE_IS_LOADING";
const TOGGLE_IS_DISABLED = "TOGGLE_IS_DISABLED";

let initialState = {
    users: [],
    pageSize: 30,
    totalUsersCount: 0,
    currentPage: 1,
    isLoading: true,
    followingInProgress: []
};


const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users,action.userId,"id",{followed: true})
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users,action.userId,"id",{followed: false})
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


export const follow = (userId) => ({type: FOLLOW, userId});
export const unfollow = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalCount) => ({type: SET_TOTAL_USERS_COUNT, totalCount});
export const toggleIsLoading = (isLoading) => ({type: TOGGLE_IS_LOADING, isLoading});
export const toggleIsDisabled = (progress, userId) => ({type: TOGGLE_IS_DISABLED, progress, userId});


export const requestUsers = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsLoading(true));
        dispatch(setCurrentPage(page));

        let data = await usersApi.getUsers(page, pageSize)
        dispatch(toggleIsLoading(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount))
    }
};

const followUnFollowFlow = async (dispatch, userId, rest, creator) => {
    dispatch(toggleIsDisabled(true, userId))
    let data = await usersApi.followUsers(userId, rest)
    if (data.resultCode === 0) {
        dispatch(creator(userId))
    }
    dispatch(toggleIsDisabled(false, userId))
}

export const followThunk = (userId, rest) => {
    return async (dispatch) => {
      await  followUnFollowFlow(dispatch, userId, rest, follow)
    }
};

export const unfollowThunk = (userId, rest) => {
    return async (dispatch) => {
       await followUnFollowFlow(dispatch, userId, rest, unfollow)
    }
};

export default usersReducer