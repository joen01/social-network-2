import React from "react";
import {connect} from "react-redux";
import Friends from "./Friends";
import {addFriendsAC, removeFriendsAC} from "../../Redux/Friends-reducer";

const mapStateToProps = (state) => {
    return {
        friends: state.sadebar.friends
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addFriends: (userId) => {
            dispatch(addFriendsAC(userId))
        },
        removeFriends: (userId) => {
            dispatch(removeFriendsAC(userId))
        },
    }
}


const FriendsContainer = connect(mapStateToProps,mapDispatchToProps)(Friends);

export default FriendsContainer