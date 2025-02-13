import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileThunk} from "../../Redux/Profile-reducer";
import {useParams , Navigate } from "react-router-dom";

let ProfileContainer = (props) => {
    let {userId} = useParams()

    const id = userId||32011
    const {getProfileThunk} = props

    useEffect(() => {
        getProfileThunk(id)
        }, [id,getProfileThunk]
    )

    if (!props.isAuth) return <Navigate to="/Login"/> ;

    return (
        <Profile {...props} profile={props.profile}/>)
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth
    }
}
export default connect(mapStateToProps, {getProfileThunk})(ProfileContainer)