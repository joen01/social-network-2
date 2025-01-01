import React from "react";
import {addMesActionCreator, updateNewMesTextActionCreator} from "../../Redux/Dialogs-reducer";
import {connect} from "react-redux";
import Dialogs from "./Dialogs";


// const DialogsContainer = () => {
//
//
//     let onMesChange = (textMes) => {
//         store.dispatch(updateNewMesTextActionCreator(textMes))
//     };
//
//     let addMessage = () => {
//         store.dispatch(addMesActionCreator())
//     };
//
//     return (
//         <Dialogs updateNewMesText={onMesChange}
//                  addMes={addMessage}
//                  dialogsPage={store.getState().dialogsPage}/>)
// }

const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNewMesText: (textMes) => {
            dispatch(updateNewMesTextActionCreator(textMes))
        },
        addMes: () => {
            dispatch(addMesActionCreator())
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)


export default DialogsContainer

