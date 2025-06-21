const ADD_FRIENDS = "ADD-FRIENDS";
const REMOVE_FRIENDS = "REMOVE-FRIENDS";


type FriendsType = {
    id:number
    name: string
    followed: boolean
    photo:string
}

let initialState = {
    friends: [
        {id: 1, name: "Liza", followed: true,  photo: "https://sopranoclub.ru/images/memy-na-avu-275-memnyh-avatarok/file56870.jpeg"},
        {id: 2, name: "Masha", followed: false, photo: "https://sopranoclub.ru/images/memy-na-avu-275-memnyh-avatarok/file56870.jpeg"},
        {id: 3, name: "Nikola", followed: true, photo: "https://sopranoclub.ru/images/memy-na-avu-275-memnyh-avatarok/file56870.jpeg"},
    ] as Array <FriendsType>
};

type InitialStateType = typeof initialState

const friendsReducer = (state = initialState, action:ActionType):InitialStateType => {
    switch (action.type) {
        case ADD_FRIENDS : {
            return {
                ...state,
                friends: state.friends.map(u => {
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
                friends: state.friends.map(u => {
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
type ActionType = AddFriendsACActionType|RemoveFriendsACActionType

type AddFriendsACActionType = {
    type: typeof ADD_FRIENDS,
    userId:number
};
type RemoveFriendsACActionType = {
    type: typeof REMOVE_FRIENDS,
    userId:number
};
export const addFriendsAC = (userId:number):AddFriendsACActionType => ({type: ADD_FRIENDS, userId});
export const removeFriendsAC = (userId:number):RemoveFriendsACActionType => ({type: REMOVE_FRIENDS, userId});

export default friendsReducer