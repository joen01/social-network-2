import React from 'react';
import f from "./Post.module.css"

const Post = (props) => {
       return (
        <div className={f.item}>
            <img
                src="https://avatars.mds.yandex.net/i?id=f20a969168efb8a6f1c20063ddd28f5a2f55ea19-10685102-images-thumbs&n=13 "/>
            {props.message}
            <span className={f.color}> {props.like} </span>

        </div>
    )
}
export default Post