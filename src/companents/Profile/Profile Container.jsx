import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUsersProfile} from "../../Redux/Profile-reducer";

class ProfileContainer extends React.Component {

    componentDidMount() {

        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/22`)
            .then(respons => {
                this.props.setUsersProfile(respons.data);
            })
    }

    render() {
        return(
            <Profile {... this.props } profile = {this.props.profile} />)

        }
    }

const mapStateToProps=(state) => {
    return{
        profile:state.profilePage.profile
    }
}

export default connect (mapStateToProps, {setUsersProfile}) (ProfileContainer)