import React from 'react';
import {Form, Formik} from 'formik';
import {createValidationSchema} from "../../utils/Validator/validationFormComponent";
import {createFormControl} from "../formControl/FormControl";
import {loginThunk} from "../../Redux/Auth-reducer";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import f from "../Profile/MyPosts/MyPosts.module.css";


const Login = ({loginThunk, isAuth, errorAuth, captchaUrl}) => {

    let loginData = (values) => {
        loginThunk(values.email, values.password, values.rememberMe, values.captcha)
    };

    if (isAuth) return <Navigate to="/Profile"/>;

    return <div>
        <h1>Login</h1>
        <LoginForm loginData={loginData} errorAuth={errorAuth} captchaUrl={captchaUrl}/>
    </div>
}

const LoginForm = ({loginData, errorAuth, captchaUrl}) => {
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
                    {createFormControl("email", "input", errors, touched, "Email", "", "Login :")}
                    {createFormControl("password", "input", errors, touched, "Password", "password", "Password :")}
                    {createFormControl("rememberMe", "", errors, touched, "", "checkbox", "Remember me")}
                    {captchaUrl && <img src={captchaUrl}/>}
                    {captchaUrl && createFormControl("captcha", "input", errors, touched, "Symbols from image", "", )}

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
        errorAuth: state.auth.errorAuth,
        captchaUrl: state.auth.captchaUrl,

    }
}
export default connect(mapStateToProps, {loginThunk})(Login)