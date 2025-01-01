const ADD_MES = "ADD-MES";
const UPDATE_NEW_MES_TEXT = "UPDATE-NEW-MES-TEXT";

let initialState = {
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
    newMessageText: 'Hello joen'
};


// const dialogsReducer = (state= initialState, action) => {
//     switch (action.type) {
//         case ADD_MES:
//             let newMes = {id: "7", message: state.newMessageText};
//             state.messages.push(newMes);
//             state.newMessageText = "";
//             break;
//         case UPDATE_NEW_MES_TEXT:
//             state.newMessageText = action.textMes;
//             break;
//         default:
//             return state
//     }
const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MES: {
            const newMes = {id: "7", message: state.newMessageText};
            return {
                ...state,
                messages: [...state.messages, newMes],
                newMessageText: ""
            };
        }
        case UPDATE_NEW_MES_TEXT: {
            return {...state, newMessageText: action.textMes};
        }
        default:
            return state;
    }
};


export const addMesActionCreator = () => ({type: ADD_MES});
export const updateNewMesTextActionCreator = (textMes) => ({type: UPDATE_NEW_MES_TEXT, textMes: textMes});

export default dialogsReducer