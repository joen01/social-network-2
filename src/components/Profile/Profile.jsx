import React from 'react';
import ProfileInfo from "./MyPosts/ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPosts Container";
import Preloader from "../common/Preloader/Preloader";


const Profile = ({profile, status, updateStatusThunk, store, isOwner, savePhoto}) => {
    if (!profile) {
        return <Preloader/>
    }
    return <div>
        <ProfileInfo profile={profile}
                     status={status}
                     updateStatusThunk={updateStatusThunk}
                     isOwner={isOwner}
                     savePhoto={savePhoto}
        />
        <hr width="99%;"/>
        <MyPostsContainer store={store}/>

    </div>
}


export default Profile



