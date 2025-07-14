import React from 'react';
import {Form, Formik, FormikValues} from 'formik';
import {createValidationSchema} from "src/utils/Validator/validationFormComponent";
import {createFormControl} from "../formControl/FormControl";
import {loginThunk} from "src/Redux/Auth-reducer";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import f from "../Profile/MyPosts/MyPosts.module.css";
import {AppStateType} from "src/Redux/Redux-store";

type MapDispatchPropsType = {
    loginThunk: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
    errorAuth: string | null
}
type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const Login: React.FC<PropsType> = ({loginThunk, isAuth, errorAuth, captchaUrl}) => {

    let loginData = (values: FormikValues) => {
        loginThunk(values.email, values.password, values.rememberMe, values.captcha)
    };

    if (isAuth) return <Navigate to="/Profile"/>;

    return <div>
        <h1>Login</h1>
        <LoginForm loginData={loginData} errorAuth={errorAuth} captchaUrl={captchaUrl}/>
    </div>
}
type LoginFormTypeProps = {
    loginData: (values: FormikValues) => void
    captchaUrl: string | null
    errorAuth: string | null
}
type LoginValuesType = {
    email: string
    password: string
    captcha: string
    rememberMe: boolean
}
type LoginValuesKeyType = Extract<keyof LoginValuesType, string>

const LoginForm: React.FC<LoginFormTypeProps> = ({loginData, errorAuth, captchaUrl}) => {
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
                    {createFormControl<LoginValuesKeyType>("email", "input", errors, touched, "Email", "", "Login :")}
                    {createFormControl<LoginValuesKeyType>("password", "input", errors, touched, "Password", "password", "Password :")}
                    {createFormControl<LoginValuesKeyType>("rememberMe", "", errors, touched, "", "checkbox", "Remember me")}
                    {captchaUrl && <img alt={"проверка пользователя"} src={captchaUrl}/>}
                    {captchaUrl && createFormControl<LoginValuesKeyType>("captcha", "input", errors, touched, "Symbols from image", "", "")}

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

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        errorAuth: state.auth.errorAuth,
        captchaUrl: state.auth.captchaUrl,

    }
}
export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {loginThunk})(Login)