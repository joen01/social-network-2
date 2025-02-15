import React from 'react';
import f from "./MyPosts.module.css"
import Post from "./Post/Post";

const MyPosts = (props) => {
    let postElement = props.posts.map(p => <Post key={p.id} message={p.message} like={p.like}/>);

    let newPostElement = React.createRef();

    let onPostChange = () => {
        let text = newPostElement.current.value
        props.updateNewPostText(text)
    };

    let onAddPost = () => {
        props.addPost()
    };

    return <div className={f.post}>
        <h2>My post</h2>

        <div>
            <textarea onChange={onPostChange} ref={newPostElement}
                      value={props.newPostText}/>
        </div>
        <div>
            <button onClick={onAddPost}> add Post</button>
        </div>


        <div className={f.posts}>
            {postElement}
        </div>

    </div>
}
export default MyPosts
