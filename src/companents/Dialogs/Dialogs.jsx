import React from "react";
import f from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, Formik} from 'formik';
import {createValidationSchema} from "../../utils/Validator/validationFormComponent";

const Dialogs = (props) => {
    const dialogElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    const messageElements = props.dialogsPage.messages.map(mes => <Message message={mes.message} key={mes.id}
                                                                           id={mes.id}/>);

    const addMessage = (values) => {
        props.addMes(values);
    };

    return (
        <div className={f.dialogs}>
            <div className={f.dialogItem}>
                {dialogElements}
            </div>
            <div className={f.messages}>
                <div>{messageElements}</div>
            </div>
            <AddMessagesForm addMessage={addMessage}/>
        </div>
    );
};

const AddMessagesForm = (props) => {

    const validationSchema = createValidationSchema([{name: 'message'}])

    return (
        <Formik
            initialValues={{message: ''}}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => {
                props.addMessage(values.message);
                resetForm(); // Сброс формы после отправки
            }}
        >
            {({handleSubmit, errors, touched}) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field component="textarea" name="message" placeholder="Hello Joen"/>
                        {errors.message && touched.message ? (
                            <div className={f.error}>{errors.message}</div>
                        ) : null}
                    </div>
                    <div>
                        <button type="submit">отправить</button>
                    </div>
                </form>
            )}
        </Formik>
    );
}
export default Dialogs