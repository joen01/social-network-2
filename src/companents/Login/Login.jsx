import React from 'react';
import {Field, Form, Formik} from 'formik';
import {createValidationSchema} from "../../utils/Validator/validationFormComponent";
import FormControl from "../formControl/FormControl";

const LoginForm = () => {
    const validationSchema = createValidationSchema([{name: "email"},{name: "password"}])
    return (
        <Formik
            initialValues={{ email : '', password: '', rememberMe: false }}
            validationSchema={validationSchema}
            onSubmit={(values,{resetForm}) => {
                console.log(values);
                resetForm();
            }}
        >
            {({handleSubmit, errors, touched}) => (
                <Form onSubmit={handleSubmit}>
                    <FormControl
                        name="email"
                        component = "input"
                        errors={errors}
                        touched={touched}
                        placeholder="Email"/>
                    <FormControl
                        name="password"
                        component = "input"
                        errors={errors}
                        touched={touched}
                        placeholder="Password"/>

                    <div>
                        <Field name="rememberMe" type="checkbox" />
                        <label htmlFor="rememberMe"> remember me</label>
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};


const Login = () => {
    return <div>
        <h1>Login</h1>
        <LoginForm/>
    </div>
}
export default Login