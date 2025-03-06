import React from 'react';
import {Field, Form, Formik} from 'formik';
import {createValidationSchema} from "../../utils/Validator/validationFormComponent";
import FormControl from "../formControl/FormControl";
import {loginThunk} from "../../Redux/Auth-reducer";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";

const Login = (props) => {

    let loginData = (values) => {
        props.loginThunk(values.email, values.password, values.rememberMe)
    };

    if (props.isAuth) return <Navigate to="/Profile"/>;

    return <div>
        <h1>Login</h1>
        <LoginForm loginData={loginData}/>
    </div>
}

const LoginForm = (props) => {
    const validationSchema = createValidationSchema([{name: "email"}, {name: "password"}])
    return (
        <Formik
            initialValues={{email: '', password: '', rememberMe: false}}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => {
                props.loginData(values);
                resetForm();
            }}
        >
            {({handleSubmit, errors, touched}) => (
                <Form onSubmit={handleSubmit}>
                    <FormControl
                        name="email"
                        component="input"
                        errors={errors}
                        touched={touched}
                        placeholder="Email"/>
                    <FormControl
                        name="password"
                        component="input"
                        errors={errors}
                        touched={touched}
                        placeholder="Password"
                        type="password"/>

                    <div>
                        <Field name="rememberMe" type="checkbox"/>
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

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
    }
}
export default connect(mapStateToProps, {loginThunk})(Login)