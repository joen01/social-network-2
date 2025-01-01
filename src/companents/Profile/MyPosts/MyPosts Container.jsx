import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../Redux/Profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

// const MyPostsContainer = () => {
//
//     const store = useContext(StoreContext);
//
//    let onPostChange = (text) => {
//         store.dispatch(updateNewPostTextActionCreator(text));
//     };
//
//     let addPost = () => {
//         store.dispatch(addPostActionCreator());
//     }
//
//     return (<MyPosts updateNewPostText={onPostChange}
//                      addPost={addPost}
//                      posts={store.getState().profilePage.posts}
//                      newPostText={store.getState().profilePage.newPostText}/>
//     )
// };
//

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (text) => {
            dispatch(updateNewPostTextActionCreator(text))
        },
        addPost:() => {
            dispatch(addPostActionCreator())
        }
    }
    }


const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts)


export default MyPostsContainer
