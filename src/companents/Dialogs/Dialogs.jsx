import React from "react";
import f from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";



const Dialogs = (props) => {
    let dialogElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    let messageElement = props.dialogsPage.messages.map(mes => <Message message={mes.message} key={mes.id}/>)

    let onMesChange = (e) => {
        let textMes = e.target.value
        props.updateNewMesText(textMes)
    };

    let addMessage = () => {
        props.addMes()
    };

    return (
        <div className={f.dialogs}>

            <div className={f.dialogItem}>
                { dialogElements }
            </div>

            <div className={f.messages}>
                <div>{messageElement}</div>
                <div>
                    <div>
                        <textarea onChange={onMesChange}
                                   value={props.dialogsPage.newMessageText}/>
                    </div>
                    <div>
                        <button onClick={addMessage}>отправить</button>
                    </div>
                </div>
            </div>


        </div>

    )
}
export default Dialogs