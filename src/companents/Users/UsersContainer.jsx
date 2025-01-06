import {connect} from "react-redux";
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    toggleIsLoadingAC,
    unfollowAC
} from "../../Redux/Users-reducer";
import axios from "axios";
import Users from "./Users C";
import React from "react";
import loanding from "../../img/loanding.svg"
import styles from "./users.module.css";
import Preloader from "../common/Preloader/Preloader";


class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsLoading(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(respons => {
                this.props.toggleIsLoading(false);
                this.props.setUsers(respons.data.items);
                this.props.setTotalUsersCount(respons.data.totalCount)
            })
    }

    onPageChanged = (pageNumber) => {
        this.props.toggleIsLoading(true);
        this.props.setCurrentPage(pageNumber);
        {
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
                .then(respons => {
                    this.props.setUsers(respons.data.items)
                    this.props.toggleIsLoading(false)

                })
        }
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
                   unfollow={this.props.unfollow}/>
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


    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(unfollowAC(userId))
        },
        unfollow: (userId) => {
            dispatch(followAC(userId))
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalUsersCountAC(totalCount))
        },
        toggleIsLoading: (isLoading) => {
            dispatch(toggleIsLoadingAC(isLoading))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)