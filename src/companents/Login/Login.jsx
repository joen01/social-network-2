import React from 'react';
import { Formik, Form, Field } from 'formik';

const LoginForm = () => {
    return (
        <Formik
            initialValues={{ Email : '', password: '', rememberMe: false }}
            onSubmit={(values) => {
                // Обработка отправки формы
                console.log(values);
            }}
        >
            {() => (
                <Form>
                    <div>
                        <Field name="Email" placeholder="Email" />
                    </div>
                    <div>
                        <Field name="password" type="password" placeholder="Password" />
                    </div>
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