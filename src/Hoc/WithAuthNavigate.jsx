import React from 'react';
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";


const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export const WithNavigate = (Companent) => {
    let NavigateComponent = (props) => {
        if (!props.isAuth) return <Navigate to="/Login"/>;
        return <Companent {...props}/>
    }

return connect(mapStateToProps)(NavigateComponent)
}
