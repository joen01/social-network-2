import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUsersProfile} from "../../Redux/Profile-reducer";
import {useParams} from "react-router-dom";


class ProfileContainer extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${this.props.userId}`)
            .then(response => {
                this.props.setUsersProfile(response.data);
            })
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>)

    }
}


const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile
    }
}

let ProfileContainerUserId = (props) => {
    const {userId} = useParams()

    return <ProfileContainer {...props} userId={userId}/>
}

export default connect(mapStateToProps, {setUsersProfile})(ProfileContainerUserId)