import React from 'react';
import f from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Field, Form, Formik} from "formik";
import {createValidationSchema} from "../../../utils/Validator/validationFormComponent";

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

    const validationSchema = createValidationSchema([{name:'post'}])
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
                    <div className={errors.post && touched.post ? f.formControl : ''}>
                        <Field name="post" component="textarea" placeholder="Post"/>
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