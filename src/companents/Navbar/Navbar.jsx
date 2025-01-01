import React from 'react';
import f from "./Navbar.module.css"
import {NavLink} from "react-router-dom";
import Friend from "../Friends/Friend/Friend";

const Navbar = () => {
    return (
        <nav className={f.nav}>
            <div className={f.item}>
                <NavLink to="/Profile">Profile</NavLink>
            </div>
            <div className={f.item}>
                <NavLink to="/Dialogs">Messages</NavLink>
            </div>
            <div className={f.item}>
                <NavLink to="/News"> News</NavLink>
            </div>
            <div className={`${f.item} ${f.active}`}>
                <NavLink to="/Music">Music</NavLink>
            </div>
            <div className={f.item}>
                <NavLink to="/Settings">Settings</NavLink>
            </div> <div className={f.item}>
                <NavLink to="/Users">Users</NavLink>
            </div>
            <div className={f.fri}>
                <NavLink to="/Friends"> Friends </NavLink>

            </div>
        </nav>
    )
}
export default Navbar