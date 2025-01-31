import React from 'react';
import ProfileInfo from "./MyPosts/ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPosts Container";
import Preloader from "../common/Preloader/Preloader";

const Profile = (props) => {

    if (!props.profile) {
        return <Preloader/>
    }

        return <div>
            <ProfileInfo profile={props.profile}/>

            <h4> FullName - {props.profile.fullName} </h4>
            <span> Network - {props.profile.contacts.vk} </span>
            <hr width="99%;"  />
            <MyPostsContainer store={props.store}/>

        </div>
    }



export default Profile