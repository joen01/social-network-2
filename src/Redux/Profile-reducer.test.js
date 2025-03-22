import profileReducer, {addPost} from "./Profile-reducer";



it('length of post should be incremented', () => {
    //1. test date
    let state = {
        posts: [
            {id: 1, message: "Hello, how are you ", like: "like 1"},
            {id: 2, message: "How are you", like: "like 4"},
            {id: 3, message: "How are you ", like: "like 20"},
            {id: 4, message: " :) ", like: "like 6"},
        ]}
    let action = addPost("hi")
   // 2. Action
   let newState = profileReducer(state,action)

//    3. expectation
   expect(newState.posts.length).toBe(5)
});
