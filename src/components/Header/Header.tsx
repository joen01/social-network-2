import React from 'react';
import f from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {DispatchPropsType, MapPropsType} from "src/components/Header/HeaderContainer";


const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    return <header className={f.header}>

        <img alt="img"
             src="https://fikiwiki.com/uploads/posts/2022-02/1645039733_10-fikiwiki-com-p-kartinki-logotipov-10.jpg"/>
        <div className={f.login}>
            {props.isAuth
                ? <div>
                    <NavLink to={'/Profile'}> {props.login} </NavLink>
                    <button onClick={props.logoutThunk}> log out</button>
                </div>
                : <NavLink to={'/Login'}> Login </NavLink>}
        </div>
    </header>
}
export default Header