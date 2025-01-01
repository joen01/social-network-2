const ADD_FRIENDS = "ADD-FRIENDS";
const REMOVE_FRIENDS = "REMOVE-FRIENDS";


let initialState = {
    friends: [
        {id: "1", name: "Liza", followed: true,  photo: "https://sopranoclub.ru/images/memy-na-avu-275-memnyh-avatarok/file56870.jpeg"},
        {id: "2", name: "Masha", followed: false, photo: "https://sopranoclub.ru/images/memy-na-avu-275-memnyh-avatarok/file56870.jpeg"},
        {id: "3", name: "Nikola", followed: true, photo: "https://sopranoclub.ru/images/memy-na-avu-275-memnyh-avatarok/file56870.jpeg"},
    ]
};

const friendsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FRIENDS : {
            return {
                ...state,
                sadebar: state.friends.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        }
        case REMOVE_FRIENDS : {
            return {
                ...state,
                sadebar: state.friends.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            };
        }
        default:
            return state;
    }
}

export const addFriendsAC = (userId) => ({type: ADD_FRIENDS, userId});
export const removeFriendsAC = (userId) => ({type: REMOVE_FRIENDS, userId});

export default friendsReducer