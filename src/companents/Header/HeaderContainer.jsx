import React from 'react';
import {connect} from "react-redux";
import {getAuthUserDataThunk, logoutThunk} from "../../Redux/Auth-reducer";
import Header from "./Header";

const HeaderContainer = (props) => {

    props.getAuthUserDataThunk()

    return <Header {...props} />
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}
export default connect(mapStateToProps, {getAuthUserDataThunk,logoutThunk})(HeaderContainer)
