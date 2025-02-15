import {addMesActionCreator, updateNewMesTextActionCreator} from "../../Redux/Dialogs-reducer";
import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import {WithNavigate} from "../../Hoc/WithAuthNavigate";


const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
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

let WithAuthNavigate = WithNavigate(Dialogs)

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(WithAuthNavigate)


export default DialogsContainer

