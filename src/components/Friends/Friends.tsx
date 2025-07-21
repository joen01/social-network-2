import React from "react";
import f from "./Friends.module.css"
import Friend from "src/components/Friends/Friend/Friend";
import {FriendsType} from "src/Redux/Friends-reducer";

type PropsType = {
    friends:Array <FriendsType>
}
const Friends: React.FC<PropsType> = (props) => {

    let friendItem = props.friends.map(fri => <Friend name={fri.name} key={fri.id}/>)

    return (
        <div className={f.item}>
            {
                friendItem
            }

        </div>

    )
}
export default Friends