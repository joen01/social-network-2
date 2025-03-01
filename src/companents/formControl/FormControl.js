import f from "../Profile/MyPosts/MyPosts.module.css";
import {Field} from "formik";
import React from 'react';

const FormControl = ({name,errors,touched,placeholder,component }) => {

  return(
      <div className={errors[name] && touched[name] ? f.formControl : ''}>
          <Field name={name} component={component} placeholder={placeholder}/>
          {errors[name] && touched[name] && <div className={f.error}>{errors[name]}</div>}
      </div>
  )
}
export default FormControl