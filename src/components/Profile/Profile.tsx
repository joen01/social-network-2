import React from 'react';
import ProfileInfo from "../../components/Profile/ProfileInfo/ProfileInfo";
import MyPostsContainer from "../../components/Profile/MyPosts/MyPosts Container";
import Preloader from "../common/Preloader/Preloader";
import {ProfileType} from "src/Types/Types";

type TypeProps = {
    profile:ProfileType|null
    status:string
    isOwner:boolean
    error:string|null
    savePhoto:(file: any)=>void
    updateStatusThunk:(status: string)=>void
    saveProfile:(file: any)=>void
}
const Profile: React.FC<TypeProps> = ({profile, status, updateStatusThunk, isOwner, savePhoto, saveProfile,error}) => {
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
        <hr style={{width:"99%;"}}/>
        <MyPostsContainer/>

    </div>
}


export default Profile



