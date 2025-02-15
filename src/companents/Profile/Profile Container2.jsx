import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileThunk} from "../../Redux/Profile-reducer";
import {useParams} from "react-router-dom";
import {WithNavigate} from "../../Hoc/WithAuthNavigate";

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

let AuthNavigateComponent = WithNavigate(ProfileContainer)

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
    }
}
export default connect(mapStateToProps, {getProfileThunk})(AuthNavigateComponent)