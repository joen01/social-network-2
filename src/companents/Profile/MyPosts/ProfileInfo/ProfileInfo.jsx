import React from 'react';
import f from "./ProfileInfo.module.css"
import Preloader from "../../../common/Preloader/Preloader";


const ProfileInfo = (props) => {
        if (!props.profile) {
        return <Preloader/>
    }
    return <div>

        <div className={f.fon}>
            <img src="https://avatars.mds.yandex.net/i?id=efff5a953e522ee049f62f12dd53602b23816c8f-10814926-images-thumbs&n=13"/>
        </div>

        <div className={f.ava}>

            <img src={props.profile.photos.large} />
            {/*<img src= "https://pixelbox.ru/wp-content/uploads/2021/04/ava-mult-vk-7.jpg"/>*/}

        </div>

    </div>
}
export default ProfileInfo