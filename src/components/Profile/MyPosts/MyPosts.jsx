import React from 'react';
import f from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Form, Formik} from "formik";
import {createValidationSchema} from "../../../utils/Validator/validationFormComponent";
import FormControl from "../../formControl/FormControl";

const MyPosts = React.memo(props => {
    let postElement = [...props.posts]
        .reverse()
        .map(p => <Post key={p.id} message={p.message} like={p.like}/>);

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
});

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
                    <FormControl
                        name="post"
                        component = "textarea"
                        errors={errors}
                        touched={touched}
                        placeholder="Post"/>
                    <div>
                        <button type="submit">Add Post</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default MyPosts;
