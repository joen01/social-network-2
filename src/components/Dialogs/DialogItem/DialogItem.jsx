import React from "react";
import f from "../Dialogs.module.css"
import {NavLink} from "react-router-dom";

const  DialogItem = (props) => {
    let path = "/dialogs/" + props.id
    return <div className={f.dialog}>
        <img src="https://sopranoclub.ru/images/memy-na-avu-275-memnyh-avatarok/file56870.jpeg"/>

        <NavLink to={path}>{props.name}</NavLink>

    </div>

}
export default DialogItem