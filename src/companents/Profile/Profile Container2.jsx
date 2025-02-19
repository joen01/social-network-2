import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileThunk, getStatusThunk, updateStatusThunk} from "../../Redux/Profile-reducer";
import {useParams} from "react-router-dom";
import {WithNavigate} from "../../Hoc/WithAuthNavigate";
import {compose} from "redux";

let ProfileContainer = (props) => {
    let {userId} = useParams()

    const id = userId || 32011
    const {getProfileThunk, getStatusThunk} = props

    useEffect(() => {

            getProfileThunk(id)
            getStatusThunk(id)
        }, [id, getProfileThunk, getStatusThunk]
    )
    return (
        <Profile {...props} profile={props.profile} status={props.status} updateStatusThunk={props.updateStatusThunk}/>)
}


const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status
    }
}


export default compose(connect(mapStateToProps, {
    getProfileThunk,
    getStatusThunk,
    updateStatusThunk
}), WithNavigate)(ProfileContainer)