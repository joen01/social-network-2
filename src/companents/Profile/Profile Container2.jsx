import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileThunk} from "../../Redux/Profile-reducer";
import {useParams} from "react-router-dom";
import {WithNavigate} from "../../Hoc/WithAuthNavigate";
import {compose} from "redux";

let ProfileContainer = (props) => {
    let {userId} = useParams()

    const id = userId || 32011
    const {getProfileThunk} = props

    useEffect(() => {
            getProfileThunk(id)
        }, [id, getProfileThunk]
    )
    return (
        <Profile {...props} profile={props.profile}/>)
}


const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
    }
}


export default compose(connect(mapStateToProps, {getProfileThunk}),WithNavigate)(ProfileContainer)