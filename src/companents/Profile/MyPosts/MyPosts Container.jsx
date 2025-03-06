import React from 'react';
import {addPost} from "../../../Redux/Profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
           }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addPost:(values) => {
//             dispatch(addPost(values))
//         }
//     }
//     }


const MyPostsContainer = connect(mapStateToProps, {addPost})(MyPosts)


export default MyPostsContainer
