import React from "react";
import f from "../Friends.module.css"
import ava from "src/img/ava.png"


type PropsType = {
    name: string
}

const Friend: React.FC<PropsType> = (props) => {
    return <div className={f.ava}>
        {props.name}
        <img src={ava} alt={"аватарка"}/>
        <span>
    <button> Remove Friends</button>
    <button> Add Friends</button>
</span>
    </div>
}
export default Friend