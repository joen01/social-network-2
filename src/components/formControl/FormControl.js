import f from "../Profile/MyPosts/MyPosts.module.css";
import {Field} from "formik";
import React from 'react';

const FormControl = ({name,errors,touched,placeholder,component,type,nameLabel, }) => {
    const hasError = errors && errors[name] && touched && touched[name]
  return(
      <div className={hasError ? f.formControl : ''}>
          <label htmlFor={name}> {nameLabel} </label>
          <Field name={name}
                 id={name}
                 component={component}
                 placeholder={placeholder}
                 type={type}

          />

          {hasError && <div className={f.error}>{errors[name]}</div>}
      </div>
  )
}
export default FormControl

export const createFormControl = (name,component,errors,touched,placeholder,type,nameLabel,) => (
    <FormControl
    name={name}
    component={component}
    errors={errors}
    touched={touched}
    placeholder={placeholder}
    type={type}
    nameLabel={nameLabel}


    />)