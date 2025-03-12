import {addMesActionCreator} from "../../Redux/Dialogs-reducer";
import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import {WithNavigate} from "../../Hoc/WithAuthNavigate";
import {compose} from "redux";


const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMes: (values) => {
            dispatch(addMesActionCreator(values))
        }
    }
}



const DialogsContainer = compose(connect(mapStateToProps, mapDispatchToProps),WithNavigate)(Dialogs)


export default DialogsContainer

