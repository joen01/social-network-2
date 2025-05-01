import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPosts Container";
import Preloader from "../common/Preloader/Preloader";


const Profile = ({profile, status, updateStatusThunk, store, isOwner, savePhoto, saveProfile,error}) => {
    if (!profile) {
        return <Preloader/>
    }
    return <div>
        <ProfileInfo profile={profile}
                     status={status}
                     updateStatusThunk={updateStatusThunk}
                     isOwner={isOwner}
                     savePhoto={savePhoto}
                     saveProfile={saveProfile}
                     error={error}
        />
        <hr width="99%;"/>
        <MyPostsContainer store={store}/>

    </div>
}


export default Profile



