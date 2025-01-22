import {connect} from "react-redux";
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsLoading,
    unfollow
} from "../../Redux/Users-reducer";
import Users from "./Users C";
import React from "react";
import Preloader from "../common/Preloader/Preloader";
import {usersApi} from "../../Api/API";


class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsLoading(true);

        usersApi.getUsers(this.props.currentPage,this.props.pageSize) .then(data => {
                this.props.toggleIsLoading(false);
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount)
            })
    }

    onPageChanged = (pageNumber) => {
        this.props.toggleIsLoading(true);
        this.props.setCurrentPage(pageNumber);
        {
            usersApi.getUsers(pageNumber,this.props.pageSize).then(data => {
                    this.props.setUsers(data.items)
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
            dispatch(follow(userId))
        },
        unfollow: (userId) => {
            dispatch(unfollow(userId))
        },
        setUsers: (users) => {
            dispatch(setUsers(users))
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPage(pageNumber))
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalUsersCount(totalCount))
        },
        toggleIsLoading: (isLoading) => {
            dispatch(toggleIsLoading(isLoading))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)