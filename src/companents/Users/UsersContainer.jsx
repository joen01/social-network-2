import {connect} from "react-redux";
import {
    follow,
    followThunk,
    getUsers,
    setTotalUsersCount,
    toggleIsDisabled,
    unfollow,
    unfollowThunk
} from "../../Redux/Users-reducer";
import Users from "./Users C";
import React from "react";
import Preloader from "../common/Preloader/Preloader";
import {WithNavigate} from "../../Hoc/WithAuthNavigate";


class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
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

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isLoading: state.usersPage.isLoading,
        followingInProgress: state.usersPage.followingInProgress


    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(follow(userId))
        },
        unfollow: (userId) => {
            dispatch(unfollow(userId))
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalUsersCount(totalCount))
        },
        toggleIsDisabled: (progress, userId) => {
            dispatch(toggleIsDisabled(progress, userId))
        },
        getUsers: (currentPage, pageSize) => {
            dispatch(getUsers(currentPage, pageSize))
        },
        followThunk: (userId, rest) => {
            dispatch(followThunk(userId, rest))
        },
        unfollowThunk: (userId, rest) => {
            dispatch(unfollowThunk(userId, rest))
        },

    }
}


export default WithNavigate(connect(mapStateToProps, mapDispatchToProps)(UsersContainer))