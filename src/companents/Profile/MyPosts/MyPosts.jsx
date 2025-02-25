import React from 'react';
import f from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Field, Form, Formik} from "formik";
import {required} from "../../../utils/Validator/required";
import * as Yup from "yup";

const MyPosts = (props) => {
    let postElement = props.posts.map(p => <Post key={p.id} message={p.message} like={p.like}/>);

    let onAddPost = (values) => {
        props.addPost(values.post);
    };

    return (
        <div className={f.post}>
            <h2>My Posts</h2>
            <AddPostForm onAddPost={onAddPost}/>
            <div className={f.posts}>
                {postElement}
            </div>
        </div>
    );
};

const AddPostForm = (props) => {

    const validationSchema = Yup.object({
        post: Yup.string()
            .required('Сообщение обязательно')
            .min(5, 'Сообщение должно содержать хотя бы 5 символ')
    });
    return (
        <Formik
            initialValues={{ post: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                props.onAddPost(values);
                resetForm();
            }}
        >
            {({ handleSubmit, errors, touched }) => (
                <Form onSubmit={handleSubmit}>
                    <div>
                        <Field name="post" component="textarea" placeholder="Post" validate={required} />
                        {errors.post && touched.post && <div className={f.error}>{errors.post}</div>}
                    </div>
                    <div>
                        <button type="submit">Add Post</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default MyPosts;