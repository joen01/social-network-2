import React, {ChangeEvent, Dispatch, SetStateAction, useState} from 'react';
import f from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "../ProfileStatuswithHooks";
import ProfileDataForm from "./ProfileDataForm";
import {ProfileType} from "src/Types/Types";


type TypeProps = {
    profile: ProfileType|null
    status: string
    isOwner: boolean
    error: string|null
    savePhoto: (file: any) => void
    updateStatusThunk: (status: string) => void
    saveProfile: (profile: ProfileType) => void
}

const ProfileInfo: React.FC<TypeProps> = ({
                                              profile,
                                              status,
                                              updateStatusThunk,
                                              isOwner,
                                              savePhoto,
                                              saveProfile,
                                              error
                                          }) => {
    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div className={f.fon}>
                <img
                    src="https://avatars.mds.yandex.net/i?id=efff5a953e522ee049f62f12dd53602b23816c8f-10814926-images-thumbs&n=13"
                    alt={"fon"}/>
            </div>
            <div className={f.ava}>
                <div className={f.container}>
                    <img src={profile.photos?.large ||
                        "https://pixelbox.ru/wp-content/uploads/2021/04/ava-mult-vk-7.jpg"} alt="User avatar"/>
                    {isOwner && <input type={"file"} onChange={onPhotoSelected} className={f.btn}/>}
                </div>
                <ProfileStatus status={status} updateStatusThunk={updateStatusThunk} isOwner={isOwner}/>
                {!editMode && <ProfileData goToEditMode={() => {
                    setEditMode(true)
                }}
                                           profile={profile}
                                           isOwner={isOwner}
                                           setEditMode={setEditMode}/>}
                {editMode && <ProfileDataForm profile={profile}
                                              saveProfile={saveProfile}
                                              goToNotEditMode={() => {
                                                  setEditMode(false)
                                              }}
                                              error={error}/>}
            </div>

        </div>)
}
type TypePropsProfileData = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
    setEditMode: Dispatch<SetStateAction<boolean>>
}
const ProfileData: React.FC<TypePropsProfileData> = ({profile, isOwner, goToEditMode}) => {
        return <div>
        <div className={f.fullName}>
            <b>{profile.fullName} </b>
        </div>
        <div>
            <b>About me - </b> {profile.aboutMe}
        </div>
        {profile.lookingForAJob ?
            <div>
                <b>lookingForAJob</b> - Yes!
            </div> :
            <div>
                <b>lookingForAJob</b> - No!
            </div>
        }

        <div>
            <b>lookingForAJobDescription -</b> {profile.lookingForAJobDescription}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValues={profile.contacts[key]}/>
        })}
        </div>
        {isOwner && <div>
            <button onClick={goToEditMode}> Редактировать</button>
        </div>}
    </div>
}

type TypePropsContact = {
    contactTitle: string
    contactValues: string
}
export const Contact: React.FC<TypePropsContact> = ({contactTitle, contactValues}) => {
    if (contactValues == null) {
        contactValues = "---"
    }
    return <div className={f.contact}>
        <b>{contactTitle}</b> : {contactValues}
    </div>
}
export default ProfileInfo
