import React from 'react';
import f from "./ProfileInfo.module.css"
import Preloader from "../../../common/Preloader/Preloader";
import ProfileStatus from ".././ProfileStatuswithHooks";


const ProfileInfo = ({profile,status,updateStatusThunk}) => {
    if (!profile) {
        return <Preloader/>
    }

    let ava = () => {
        return (
            !profile.photos.large ?
                <img src="https://pixelbox.ru/wp-content/uploads/2021/04/ava-mult-vk-7.jpg" alt="Default avatar"/> :
                <img src={profile.photos.large} alt="User avatar"/>
        );
    }

    return (
        <div>

            <div className={f.fon}>
                <img
                    src="https://avatars.mds.yandex.net/i?id=efff5a953e522ee049f62f12dd53602b23816c8f-10814926-images-thumbs&n=13"
                    alt={"fon"}/>
            </div>

            <div className={f.ava}>
                {ava()}
                <ProfileStatus status={status} updateStatusThunk={updateStatusThunk}/>
            </div>

        </div>)
}
export default ProfileInfo
