import React from 'react';
import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {createFormControl} from "../../formControl/FormControl";

const ProfileDataForm = ({profile, saveProfile, goToNotEditMode}) => {

    const initialValues = {
        fullName: profile.fullName || "",
        contacts: profile.contacts || {},
        aboutMe: profile.aboutMe || "",
        lookingForAJob: profile.lookingForAJob || false,
        lookingForAJobDescription: profile.lookingForAJobDescription || "",
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Обязательно'),
        contacts: Yup.object().shape({
            facebook: Yup.string().url('Неверный URL').nullable(),
            website: Yup.string().url('Неверный URL').nullable(),
            // Добавьте другие поля контактов по мере необходимости
        }),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                saveProfile(values);
                goToNotEditMode();
            }}
        >
            {({handleSubmit, errors, touched, values}) => (
                <Form onSubmit={handleSubmit}>
                    {createFormControl("fullName", "input", {errors}, {touched}, "FullName", "", "Full name")}
                    {createFormControl("aboutMe", "input", {errors}, {touched}, "About me", "", "About me")}
                    {createFormControl("lookingForAJob", "", {errors}, {touched}, "", "checkbox", "looking For A Job")}
                    {createFormControl("lookingForAJobDescription", "input", {errors}, {touched}, "looking For A Job Description", "textarea", "looking For A Job Description")}

                    <div>
                        <b>Contacts</b>: {Object.keys(values.contacts).map(key => (
                        <div key={key}>
                            <label htmlFor={`contacts.${key}`}>{key}</label>
                            <Field name={`contacts.${key}`}
                                   placeholder={key}
                                   value={values.contacts[key] || ''}/>
                        </div>
                    ))}
                    </div>
                    <button type="submit">Сохранить</button>
                </Form>
            )}
        </Formik>
    );
};

export default ProfileDataForm;