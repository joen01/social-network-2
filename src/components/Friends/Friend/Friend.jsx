import React from "react";
import f from "../Friends.module.css"



const Friend = (props) => {
    return <div className={f.ava}>
        {props.name}
        <img src="https://sopranoclub.ru/images/memy-na-avu-275-memnyh-avatarok/file56870.jpeg"/>
<span>

    <button> Remove Friends</button>
    <button> Add Friends</button>
</span>
    </div>
}
export default Friend