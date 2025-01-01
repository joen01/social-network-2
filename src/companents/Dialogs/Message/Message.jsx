import React from "react";
import f from "../Dialogs.module.css"


const Message = (props) => {
    return <div className={f.message}> {props.message}

    </div>
}

export default Message