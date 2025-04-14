import React from "react";
import f from "../Dialogs.module.css"
import ava from "../../../img/ava.png"
import {NavLink} from "react-router-dom";

const  DialogItem = (props) => {
    let path = "/dialogs/" + props.id
    return <div className={f.dialog}>
        <img src={ava} alt={"img"}/>

        <NavLink to={path}>{props.name}</NavLink>

    </div>

}
export default DialogItem