import React from "react";
import f from "./Friends.module.css"
import Friend from "./Friend/Friend";


const Friends = (props) => {

    let friendItem = props.friends.map(fri => <Friend name={fri.name} key={fri.id} id={fri.id}/>)

    return (
        <div className={f.item}>
            {
                friendItem
            }

        </div>

    )
}
export default Friends