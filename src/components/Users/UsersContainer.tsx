import {connect} from "react-redux";
import {
    follow,
    followThunk,
    requestUsers,
    setTotalUsersCount,
    toggleIsDisabled,
    unfollow,
    unfollowThunk} from "src/Redux/Users-reducer";
import Users from "./Users";
import React from "react";
import Preloader from "../common/Preloader/Preloader";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsLoading,
    getPageSize,
    getTotalUsersCount,
    getUsers} from "src/Redux/usersSelectors";
import {UserType} from "src/Types/Types";
import {AppStateType} from "src/Redux/Redux-store";

type MapStatePropsType = {
    pageSize: number
    currentPage: number
    isLoading: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number> // array user id

}
type MapDispatchPropsType = {
    toggleIsDisabled:(progress:boolean, userId:number)=>void
    follow:(userId:number)=>void
    unfollow:(userId:number)=>void
    getUsers: (currentPage: number, pageSize: number) => void
    unfollowThunk: (userId:number, rest:any) => void
    followThunk: (userId:number, rest:any) => void
    setTotalUsersCount:(totalCount:number)=>void

}
type OwnPropsType = {
}

type PropsType =  MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }


    render() {
        return <>
            {this.props.isLoading ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   toggleIsDisabled={this.props.toggleIsDisabled}
                   followingInProgress={this.props.followingInProgress}
                   unfollowThunk={this.props.unfollowThunk}
                   followThunk={this.props.followThunk}/>
        </>
    }

}

// const mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isLoading: state.usersPage.isLoading,
//         followingInProgress: state.usersPage.followingInProgress
//
//
//     }
// }

const mapStateToProps = (state: AppStateType):MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isLoading: getIsLoading(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(follow(userId))
//         },
//         unfollow: (userId) => {
//             dispatch(unfollow(userId))
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setTotalUsersCount(totalCount))
//         },
//         toggleIsDisabled: (progress, userId) => {
//             dispatch(toggleIsDisabled(progress, userId))
//         },
//         getUsers: (currentPage, pageSize) => {
//             dispatch(requestUsers(currentPage, pageSize))
//         },
//         followThunk: (userId, rest) => {
//             dispatch(followThunk(userId, rest))
//         },
//         unfollowThunk: (userId, rest) => {
//             dispatch(unfollowThunk(userId, rest))
//         },
//
//     }
//
// }


export default
//<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
connect <MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    follow,
    unfollow,
    setTotalUsersCount,
    toggleIsDisabled,
    getUsers: requestUsers,
    followThunk,
    unfollowThunk
})(UsersContainer)