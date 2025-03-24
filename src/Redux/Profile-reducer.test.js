import profileReducer, {addPost, deletePost} from "./Profile-reducer";

let state = {
    posts: [
        {id: 1, message: "Hello, how are you ", like: "like 1"},
        {id: 2, message: "How are you", like: "like 4"},
        {id: 3, message: "How are you ", like: "like 20"},
        {id: 4, message: " :) ", like: "like 6"},
    ]}

test ('message "hi"', () => {
    //1. test date

    let action = addPost("hi")
   // 2. Action
   let newState = profileReducer(state,action)

//    3. expectation
   expect(newState.posts[4].message).toBe("hi")
});

test ("like 0 ", () => {
    let action = addPost("hi")
    let newState = profileReducer(state,action)
    expect(newState.posts[4].like).toBe("like 0")
});

test ("The post should be deleted", () => {
    let action = deletePost(3)
    let newState = profileReducer(state,action)
    expect(newState.posts.length).toBe(3)
});
