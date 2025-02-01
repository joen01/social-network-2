import React from 'react';
import {connect} from "react-redux";
import {authThunk} from "../../Redux/Auth-reducer";
import Header from "./Header";

const HeaderContainer = (props) => {

    props.authThunk()

    return <Header {...props} />
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}
export default connect(mapStateToProps, {authThunk})(HeaderContainer)
