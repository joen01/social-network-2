import profileReducer from "./Profile-reducer";
import dialogsReducer from "./Dialogs-reducer";
import friendsReducer from "./Friends-reducer";

let store = {
    _state: {

        profilePage: {
            posts: [
                {message: "Hello, how are you ", lake: "like 1"},
                {message: "How are you", lake: "like 4"},
                {message: "How are you ", lake: "like 20"},
                {message: " :) ", lake: "like 6"},
            ],
            newPostText: " Hello "

        },
        dialogsPage: {
            dialogs: [
                {id: "1", name: "Liza"},
                {id: "2", name: "Masha"},
                {id: "3", name: "Nikola"},
                {id: "4", name: "Andrey"},
                {id: "5", name: "Sveta"},
                {id: "6", name: "Evgeny"}
            ],
            messages: [
                {id: "1", message: "Hello"},
                {id: "2", message: "Привет"},
                {id: "3", message: "How are you"},
                {id: "4", message: "Hello. How are you"},
                {id: "5", message: "Yooo"},
                {id: "6", message: "Привет. ты не знаешь где кот?"}
            ],
            newMessageText: " hello joen "
        },
        sadebar: {
            friends: [
                {id: "1", name: "Liza"},
                {id: "2", name: "Masha"},
                {id: "3", name: "Nikola"},
            ]
        }
    },
    getState() {
        return this._state;
    },
    _callSubscribe() {
        console.log("state changed")
    },

    subscribe(observer) {
        this._callSubscribe = observer
    },


    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sadebar = friendsReducer(this._state.sadebar, action)
        this._callSubscribe(this._state)
    }
};

window.store = store;
export default store