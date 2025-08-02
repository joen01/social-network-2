import React from 'react';
import ProfileInfo from "src/components/Profile/ProfileInfo/ProfileInfo";
import MyPostsContainer from "src/components/Profile/MyPosts/MyPostsContainer";
import Preloader from "../common/Preloader/Preloader";
import {ProfileType} from "src/Types/Types";

type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean
    error: string | null
    savePhoto: (file: File) => void
    updateStatusThunk: (status: string) => void
    saveProfile: (profile: ProfileType) => object

}

const Profile: React.FC<PropsType> = ({profile, status, updateStatusThunk, isOwner, savePhoto, saveProfile, error}) => {
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
        <hr style={{width: "99%;"}}/>
        <MyPostsContainer/>

    </div>
}


export default Profile



