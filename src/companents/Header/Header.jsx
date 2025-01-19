import React from 'react';
import f from "./Header.module.css"
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return <header className={f.header}>

        <img src="https://fikiwiki.com/uploads/posts/2022-02/1645039733_10-fikiwiki-com-p-kartinki-logotipov-10.jpg"/>
        <div className={f.login}>
            {props.isAuth ? <NavLink to={'/Profile'}> {props.login} </NavLink>  : <NavLink to={'/Login'}> Login </NavLink>}
        </div>
    </header>
}
export default Header