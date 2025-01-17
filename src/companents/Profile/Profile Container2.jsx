import React, {useEffect} from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUsersProfile} from "../../Redux/Profile-reducer";
import {useParams} from "react-router-dom";

let ProfileContainer = (props) => {
    let {userId} = useParams()


    useEffect(() => {

            if (!userId) {
                userId = 32011
            }
            axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
                .then(response => {
                    props.setUsersProfile(response.data);

                })
        }, [userId]
    )

    return (
        <Profile {...props} profile={props.profile}/>)
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile
    }
}
export default connect(mapStateToProps, {setUsersProfile})(ProfileContainer)