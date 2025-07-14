import React from "react";
import f from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Form, Formik} from 'formik';
import {createValidationSchema} from "src/utils/Validator/validationFormComponent";
import FormControl from "src/components/formControl/FormControl";
import {DialogsPageType} from "src/Types/Types";


type TypeProps = {
    dialogsPage: DialogsPageType
    addMes: (values: string) => void
}


const Dialogs: React.FC<TypeProps> = (props) => {
    const dialogElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    const messageElements = props.dialogsPage.messages.map(mes => <Message message={mes.message} key={mes.id}
                                                                           id={mes.id}/>);

    const addMessage = (values: string) => {
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

type AddMessagesFormPropsType = {
    addMessage: (values: string) => void
}
const AddMessagesForm: React.FC<AddMessagesFormPropsType> = (props) => {

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
                <Form onSubmit={handleSubmit}>
                    <FormControl
                        name="message"
                        component="textarea"
                        errors={errors}
                        touched={touched}
                        placeholder="Hello Joen"
                        type=""
                        nameLabel=""/>
                    <div>
                        <button type="submit">отправить</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
export default Dialogs