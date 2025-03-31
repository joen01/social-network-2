import f from "../Profile/MyPosts/MyPosts.module.css";
import {Field} from "formik";
import React from 'react';

const FormControl = ({name,errors,touched,placeholder,component,type }) => {
  return(
      <div className={errors[name] && touched[name] ? f.formControl : ''}>
          <Field name={name} component={component} placeholder={placeholder} type={type}/>
          {errors[name] && touched[name] && <div className={f.error}>{errors[name]}</div>}
      </div>
  )
}
export default FormControl

export const createFormControl = (name,component,errors,touched,placeholder,type) => (
    <FormControl
    name={name}
    component={component}
    errors={errors}
    touched={touched}
    placeholder={placeholder}
    type={type}

    />)