import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileThunk, getStatusThunk, savePhoto, saveProfile, updateStatusThunk} from "src/Redux/Profile-reducer";
import {useParams} from "react-router-dom";
import {WithNavigate} from "src/Hoc/WithAuthNavigate";
import {compose} from "redux";
import {ProfileType} from "src/Types/Types";
import {AppStateType} from "src/Redux/Redux-store";


type MapDispatchPropsType = {
    updateStatusThunk: (status: string) => void
    getProfileThunk: (userId: number|null) => void
    getStatusThunk: (userId: number|null) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType|null) => object
}

type MapStatePropsType = {
    profile: ProfileType | null
    status: string
    myId: number|null
    errorProfile: string | null
}

type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

let ProfileContainer: React.FC<PropsType> = (props) => {
    let {userId} = useParams()

    const id = userId ? Number(userId) : props.myId
    const {getProfileThunk, getStatusThunk} = props

    useEffect(() => {
            getProfileThunk(id)
            getStatusThunk(id)
        }, [id, getProfileThunk, getStatusThunk]
    )
    return (
        <Profile {...props}
                 profile={props.profile}
                 status={props.status}
                 updateStatusThunk={props.updateStatusThunk}
                 isOwner={id === props.myId}
                 savePhoto={props.savePhoto}
                 saveProfile={props.saveProfile}
                 error={props.errorProfile}/>)
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        myId: state.auth.id,
        errorProfile: state.profilePage.errorProfile
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
(mapStateToProps, {
    getProfileThunk,
    getStatusThunk,
    updateStatusThunk,
    savePhoto, saveProfile
}), WithNavigate)(ProfileContainer)as React.ComponentType<any>