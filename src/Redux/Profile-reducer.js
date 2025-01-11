const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";

let initialState = {
    posts: [
        {message: "Hello, how are you ", lake: "like 1"},
        {message: "How are you", lake: "like 4"},
        {message: "How are you ", lake: "like 20"},
        {message: " :) ", lake: "like 6"},
    ],
    newPostText: " Hello ",
    profile: null


};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            const newPost = {message: state.newPostText, lake: "like 0"};
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ""
            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            };
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile }
        }
        default:
            return state;
    }
};


export const addPost = () => ({type: ADD_POST})
export const updateNewPostText = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text});
export const setUsersProfile = (profile) => ({type: SET_USER_PROFILE, profile});

export default profileReducer