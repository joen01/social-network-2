import {InferActionType} from "src/Redux/Redux-store";

export type FriendsType = {
    id:number
    name: string
    followed?: boolean
    photo?:string
}

let initialState = {
    friends: [
        {id: 1, name: "Liza", followed: true,  photo: "https://sopranoclub.ru/images/memy-na-avu-275-memnyh-avatarok/file56870.jpeg"},
        {id: 2, name: "Masha", followed: false, photo: "https://sopranoclub.ru/images/memy-na-avu-275-memnyh-avatarok/file56870.jpeg"},
        {id: 3, name: "Nikola", followed: true, photo: "https://sopranoclub.ru/images/memy-na-avu-275-memnyh-avatarok/file56870.jpeg"},
    ] as Array <FriendsType>
};

type InitialStateType = typeof initialState

const friendsReducer = (state = initialState, action:friendsActionType):InitialStateType => {
    switch (action.type) {
        case "SN/FRIENDS/ADD-FRIENDS" : {
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
        case "SN/FRIENDS/REMOVE-FRIENDS" : {
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
type friendsActionType = InferActionType<typeof friendsAction>

export  const friendsAction = {
    addFriendsAC: (userId:number)=> ({type: "SN/FRIENDS/ADD-FRIENDS", userId} as const),
    removeFriendsAC: (userId:number) => ({type: "SN/FRIENDS/REMOVE-FRIENDS", userId}as const)
}

export default friendsReducer