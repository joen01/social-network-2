const ADD_MES = "ADD-MES";

let initialState = {
    dialogs: [
        {id: 1, name: "Liza"},
        {id: 2, name: "Masha"},
        {id: 3, name: "Nikola"},
        {id: 4, name: "Andrey"},
        {id: 5, name: "Sveta"},
        {id: 6, name: "Evgeny"}
    ],
    messages: [
        {id: 1, message: "Hello"},
        {id: 2, message: "Привет"},
        {id: 3, message: "How are you"},
        {id: 4, message: "Hello. How are you"},
        {id: 5, message: "Yooo"},
        {id: 6, message: "Привет. ты не знаешь где кот?"}
    ],
    nextId: 7
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MES: {
            const newMes = {id: state.nextId, message: action.values};
            return {
                ...state,
                messages: [...state.messages, newMes],
                nextId: state.nextId+1
            };
        }
        default:
            return state;
    }
};


export const addMesActionCreator = (values) => ({type: ADD_MES, values: values});

export default dialogsReducer