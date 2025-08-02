import React from 'react';
import f from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Form, Formik, FormikHelpers} from "formik";
import {createValidationSchema} from "src/utils/Validator/validationFormComponent";
import {createFormControl} from "../../formControl/FormControl";
import {PostsType} from "src/Types/Types";

type PropsType = {
    posts: Array<PostsType>,
    addPost: (values: string) => void
}

const MyPosts: React.FC<PropsType> = React.memo(props => {
    let postElement = [...props.posts]
        .reverse()
        .map(p => <Post key={p.id} message={p.message} like={p.like}/>);

    let onAddPost = (values: { post: string }) => {
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

type AddPostFormPropsType = {
    onAddPost: (values: { post: string }) => void
}

type FormValues = {
    post: string;
};
type ValuesKeyType = Extract<keyof FormValues, string>

const AddPostForm: React.FC<AddPostFormPropsType> = (props) => {
    return (
        <Formik<FormValues>
            initialValues={{post: ''}}
            validationSchema={createValidationSchema([{name: 'post'}])}
            onSubmit={(values: FormValues, {resetForm}: FormikHelpers<FormValues>) => {
                props.onAddPost(values);
                resetForm();
            }}
        >
            {({handleSubmit, errors, touched}) => (
                <Form onSubmit={handleSubmit}>
                    {createFormControl<ValuesKeyType>("post", "textarea", errors, touched, "Post", "", "Post :")}
                    <div>
                        <button type="submit">Add Post</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default MyPosts;
