import {DialogsType, MessagesType} from "src/Types/Types";
import {InferActionType} from "src/Redux/Redux-store";

let initialState = {
    dialogs: [
        {id: 1, name: "Liza"},
        {id: 2, name: "Masha"},
        {id: 3, name: "Nikola"},
        {id: 4, name: "Andrey"},
        {id: 5, name: "Sveta"},
        {id: 6, name: "Evgeny"}
    ] as Array <DialogsType>,
    messages: [
        {id: 1, message: "Hello"},
        {id: 2, message: "Привет"},
        {id: 3, message: "How are you"},
        {id: 4, message: "Hello. How are you"},
        {id: 5, message: "Yooo"},
        {id: 6, message: "Привет. ты не знаешь где кот?"}
    ] as Array <MessagesType>,
    nextId: 7
};

export type initialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: authActionType): initialStateType => {
    switch (action.type) {
        case "SN/DIALOGS/ADD-MES": {
            const newMes = {id: state.nextId, message: action.values};
            return {
                ...state,
                messages: [...state.messages, newMes],
                nextId: state.nextId + 1
            };
        }
        default:
            return state;
    }
};

export type authActionType = InferActionType<typeof dialogAction>

export const dialogAction = {
    addMesActionCreator: (values: string) => ({type: "SN/DIALOGS/ADD-MES", values: values} as const)
}

export default dialogsReducer