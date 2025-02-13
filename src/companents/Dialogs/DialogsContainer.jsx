import React from "react";
import {addMesActionCreator, updateNewMesTextActionCreator} from "../../Redux/Dialogs-reducer";
import {connect} from "react-redux";
import Dialogs from "./Dialogs";


const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
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

