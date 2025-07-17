import React from 'react';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {createFormControl} from "src/components/formControl/FormControl";
import f from "../MyPosts/MyPosts.module.css";
import {ProfileType} from "src/Types/Types";


type PropsType = {
    profile: ProfileType
    error: string | null
    saveProfile: (profile: ProfileType) => object
    goToNotEditMode: () => void
}


const ProfileDataForm: React.FC<PropsType> = ({profile, saveProfile, goToNotEditMode, error}) => {

    const initialValues:ProfileType = {
        fullName: profile.fullName || "--",
        contacts: profile.contacts || {},
        aboutMe: profile.aboutMe || "--",
        lookingForAJob: profile.lookingForAJob || undefined,
        lookingForAJobDescription: profile.lookingForAJobDescription || "--",
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Обязательно'),
        contacts: Yup.object().shape({
            facebook: Yup.string(),
            website: Yup.string(),
            errors: Yup.string(),
            touched: Yup.boolean(),

            // Добавьте другие поля контактов по мере необходимости
        }),
    });

    // @ts-ignore
     return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, {setErrors}) => {
                const errorMessages = await saveProfile(values);
                if (errorMessages) {
                    setErrors(errorMessages); // Устанавливаем ошибки в соответствии со структурой

                } else {
                    goToNotEditMode();
                    setErrors({})
                }
            }}
        >

            {({handleSubmit, errors, touched, values}) => (
                <Form onSubmit={handleSubmit}>

                    {createFormControl("fullName", "input", errors, touched, "FullName", "", "Full name")}
                    {createFormControl("aboutMe", "input", errors, touched, "About me", "", "About me")}
                    {createFormControl("lookingForAJob", "", errors, touched, "", "checkbox", "looking For A Job")}
                    {createFormControl("lookingForAJobDescription", "input", errors, touched, "looking For A Job Description", "textarea", "looking For A Job Description")}

                    <div>
                        <b>Contacts</b>: {Object.keys(values.contacts).map(key => (
                        <div key={key}> {createFormControl(`contacts.${key}`, "input", errors, touched, key, "", key)}
                        </div>
                        // <div key={key}>
                        //     <label htmlFor={`contacts.${key}`}>{key}</label>
                        //     <Field name={`contacts.${key}`}
                        //            placeholder={key}
                        //            value={values.contacts[key] || ''}/>
                        // </div>
                    ))}
                    </div>
                    {error && <div className={f.sameError}>
                        {error}
                    </div>}
                    <button type="submit">Сохранить</button>

                </Form>
            )}
        </Formik>
    );
};

export default ProfileDataForm;
