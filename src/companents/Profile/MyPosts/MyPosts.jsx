import React from 'react';
import f from "./MyPosts.module.css"
import Post from "./Post/Post";


const MyPosts = (props) => {


    let postElement = props.posts.map(p => <Post message={p.message} key={p.id} like={p.lake}/>);

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
// import React from 'react';
// import f from "./MyPosts.module.css";
// import Post from "./Post/Post";
// import { addPostActionCreator, updateNewPostTextActionCreator } from "../../../Redux/Profile-reducer";
// import { connect } from 'react-redux';
//
// const MyPosts = (props) => {
//     let postElement = props.post.map(p => <Post key={p.id} message={p.message} like={p.lake} />);
//     let newPostElement = React.createRef();
//
//     let onPostChange = () => {
//         let text = newPostElement.current.value;
//         props.updateNewPostText(text);
//     };
//
//     let addPost = () => {
//         props.addPost();
//     };
//
//     return (
//         <div className={f.post}>
//             <h2>My post</h2>
//             <div>
//                 <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText} />
//             </div>
//             <div>
//                 <button onClick={addPost}>add Post</button>
//             </div>
//             <div className={f.posts}>
//                 {postElement}
//             </div>
//         </div>
//     );
// };
//
// const mapStateToProps = (state) => ({
//     post: state.profilePage.posts,
//     newPostText: state.profilePage.newPostText,
// });
//
// const mapDispatchToProps = (dispatch) => ({
//     addPost: () => dispatch(addPostActionCreator()),
//     updateNewPostText: (text) => dispatch(updateNewPostTextActionCreator(text)),
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);