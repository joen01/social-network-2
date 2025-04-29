import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileThunk, getStatusThunk, savePhoto, saveProfile, updateStatusThunk} from "../../Redux/Profile-reducer";
import {useParams} from "react-router-dom";
import {WithNavigate} from "../../Hoc/WithAuthNavigate";
import {compose} from "redux";

let ProfileContainer = (props) => {
    let {userId} = useParams()

    const id = userId || props.myId
    const {getProfileThunk, getStatusThunk} = props

    useEffect(() => {

            getProfileThunk(id)
            getStatusThunk(id)
        }, [id, getProfileThunk, getStatusThunk]
    )
        return (
        <Profile {...props}
                 profile={props.profile}
                 status={props.status}
                 updateStatusThunk={props.updateStatusThunk}
                 isOwner={id === props.myId}
                 savePhoto={props.savePhoto}
                 saveProfile={props.saveProfile}/>)
}


const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        myId: state.auth.id
    }
}


export default compose(connect(mapStateToProps, {
    getProfileThunk,
    getStatusThunk,
    updateStatusThunk,
    savePhoto,saveProfile
}), WithNavigate)(ProfileContainer)