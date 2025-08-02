import {dialogAction} from "src/Redux/Dialogs-reducer";
import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import {WithNavigate} from "src/Hoc/WithAuthNavigate";
import {compose} from "redux";
import {AppStateType} from "src/Redux/Redux-store";
import {DialogsPageType} from "src/Types/Types";

type MapStateToPropsType={
    dialogsPage:DialogsPageType
}
type MapDispatchToPropsType={
    addMes: (values: string) => void
}
type OwnPropsType = {}

const mapStateToProps = (state:AppStateType):MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}

// const mapDispatchToProps = (dispatch:any):MapDispatchToPropsType => {
//     return {
//         addMes: (values) => {
//             dispatch(dialogAction.addMesActionCreator(values))
//         }
//     }
// }



const DialogsContainer = compose(connect<MapStateToPropsType, MapDispatchToPropsType,OwnPropsType, AppStateType>
(mapStateToProps, {addMes: dialogAction.addMesActionCreator}),WithNavigate)(Dialogs)


export default DialogsContainer

