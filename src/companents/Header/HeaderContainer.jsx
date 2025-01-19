import React, {useEffect} from 'react';
import f from "./Header.module.css"
import {NavLink} from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux";
import {setUserData} from "../../Redux/Auth-reducer";
import Header from "./Header";

const HeaderContainer = (props) => {

    useEffect(()=>{
            axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`,{
                withCredentials: true
            })
                .then(response => {
                    if (response.data.resultCode === 0 ) {
                        let {id,email,login} = response.data.data;
                        props.setUserData(id,email,login)
                    }
                })

        }
    )
    return <Header {...props} />
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}
export default connect(mapStateToProps, {setUserData})(HeaderContainer)
