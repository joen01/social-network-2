import React from 'react';
import f from "./Profile.module.css"
import ProfileInfo from "./MyPosts/ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPosts Container";

const Profile = (props) => {

    return <div>
        <ProfileInfo/>
        <MyPostsContainer store={props.store}/>

    </div>
}


export default Profile