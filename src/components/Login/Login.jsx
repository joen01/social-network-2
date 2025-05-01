import React from 'react';
import {Field, Form, Formik} from 'formik';
import {createValidationSchema} from "../../utils/Validator/validationFormComponent";
import {createFormControl} from "../formControl/FormControl";
import {loginThunk} from "../../Redux/Auth-reducer";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import f from "../Profile/MyPosts/MyPosts.module.css";


const Login = ({loginThunk, isAuth, errorAuth}) => {

    let loginData = (values) => {
        loginThunk(values.email, values.password, values.rememberMe)
    };

    if (isAuth) return <Navigate to="/Profile"/>;

    return <div>
        <h1>Login</h1>
        <LoginForm loginData={loginData} errorAuth={errorAuth}/>
    </div>
}

const LoginForm = ({loginData, errorAuth}) => {
    const validationSchema = createValidationSchema([{name: "email"}, {name: "password"}])
    return (
        <Formik
            initialValues={{email: '', password: '', rememberMe: false}}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => {
                loginData(values);
                resetForm();
            }}
        >
            {({handleSubmit, errors, touched}) => (
                <Form onSubmit={handleSubmit}>
                    {createFormControl("email", "input", errors, touched, "Email","","Login :")}
                    {createFormControl("password", "input", errors, touched, "Password", "password","Password :")}

                    <div>
                        <Field name="rememberMe" type="checkbox"/>
                        <label htmlFor="rememberMe"> remember me</label>
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                    {errorAuth && <div className={f.sameError}>
                        {errorAuth}
                    </div>
                    }
                </Form>
            )}
        </Formik>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        errorAuth: state.auth.errorAuth
    }
}
export default connect(mapStateToProps, {loginThunk})(Login)