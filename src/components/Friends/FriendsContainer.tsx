// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import {connect} from "react-redux";
import Friends from "src/components/Friends/Friends";
import {friendsAction,FriendsType} from "src/Redux/Friends-reducer";
import {AppStateType} from "src/Redux/Redux-store";

type MapStatePropsType = {
    friends:Array <FriendsType>
}
type MapDispatchPropsType = {
    addFriends: (userId: number) => void
    removeFriends: (userId: number) => void
}
type OwnPropsType ={}


const mapStateToProps = (state:AppStateType):MapStatePropsType => {
    return {
        friends: state.sadebar.friends
    }
}
const mapDispatchToProps = (dispatch:any):MapDispatchPropsType => {
    return {
        addFriends: (userId:number) => {
            dispatch(friendsAction.addFriendsAC(userId))
        },
        removeFriends: (userId:number) => {
            dispatch(friendsAction.removeFriendsAC(userId))
        },
    }
}


const FriendsContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)(Friends);

export default FriendsContainer