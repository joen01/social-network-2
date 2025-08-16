import React from 'react';
import {connect} from "react-redux";
import {logoutThunk} from "src/Redux/Auth-reducer";
import Header from "./Header";
import {AppStateType} from "src/Redux/Redux-store";

export type MapPropsType = {
    isAuth: boolean
    login: string | null
   }
export type DispatchPropsType = {
    logoutThunk: () => void
}

const HeaderContainer: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    return <Header {...props} />
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}
export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {logoutThunk})(HeaderContainer)
