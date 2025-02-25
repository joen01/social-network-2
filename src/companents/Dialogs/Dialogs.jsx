// import React from "react";
// import f from "./Dialogs.module.css"
// import DialogItem from "./DialogItem/DialogItem";
// import Message from "./Message/Message";
// import {Field, Formik} from 'formik';
//
//
// const Dialogs = (props) => {
//     let dialogElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)
//     let messageElement = props.dialogsPage.messages.map(mes => <Message message={mes.message} key={mes.id}/>)
//
//
//     let addMessage = (values) => {
//         props.addMes(values)
//     };
//
//     return (
//         <div className={f.dialogs}>
//
//             <div className={f.dialogItem}>
//                 {dialogElements}
//             </div>
//
//             <div className={f.messages}>
//                 <div>{messageElement}</div>
//
//             </div>
//             <AddMessagesForm addMessage={addMessage}/>
//         </div>
//
//     )
// }
// let AddMessagesForm = (props) => {
//     return (
//         <Formik
//             initialValues={{ message: '' }}
//             onSubmit={(values, { resetForm }) => {
//                 // Обработка отправки формы
//                 props.addMessage(values.message)
//                 resetForm(); // Сброс формы после отправки
//             }}
//         >
//             {({ handleSubmit }) => (
//                 <form onSubmit={handleSubmit}>
//                     <div>
//                         <Field component="textarea" name="message" placeholder="Hello Joen" />
//                     </div>
//                     <div>
//                         <button type="submit">отправить</button>
//                     </div>
//                 </form>
//             )}
//         </Formik>
//     )
// }
//
// export default Dialogs

import React from "react";
import f from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, Formik} from 'formik';
import * as Yup from "yup";

const Dialogs = (props) => {
    const dialogElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
    const messageElements = props.dialogsPage.messages.map(mes => <Message message={mes.message} key={mes.id} id={mes.id} />);

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
            <AddMessagesForm addMessage={addMessage} />
        </div>
    );
};

const AddMessagesForm = (props) => {

    const validationSchema = Yup.object({
        message: Yup.string()
            .required('Сообщение обязательно')
            .min(3, 'Сообщение должно содержать хотя бы 3 символ')
    });
    return (
        <Formik
            initialValues={{ message: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                props.addMessage(values.message);
                resetForm(); // Сброс формы после отправки
            }}
        >
            {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field component="textarea" name="message" placeholder="Hello Joen" />
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