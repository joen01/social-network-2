import {profileAction} from "src/Redux/Profile-reducer";
import MyPosts, {DispatchPropsType, PropsType} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "src/Redux/Redux-store";

const mapStateToProps = (state:AppStateType) => {
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


const MyPostsContainer = connect<PropsType, DispatchPropsType,{},AppStateType>(mapStateToProps, {addPost:profileAction.addPost})(MyPosts)


export default MyPostsContainer
