import f from "../Profile/MyPosts/MyPosts.module.css";
import {Field} from "formik";
import React from 'react';


type TypeProps = {
    name:string
    errors: {[key:string]:string}|null
    touched: {[key:string]:boolean}
    placeholder:string
    component: string
    type: string
    nameLabel: string
}
const FormControl:React.FC<TypeProps> = ({name,errors,touched,placeholder,component,type,nameLabel, }) => {
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

export function createFormControl<FormKeysType extends string> (name:FormKeysType,
                                  component:string,
                                  errors:{[key:string]:string}|null,
                                  touched: {[key:string]:boolean},
                                  placeholder:string,
                                  type:string,
                                  nameLabel:string) {
    return <FormControl
            name={name}
            component={component}
            errors={errors}
            touched={touched}
            placeholder={placeholder}
            type={type}
            nameLabel={nameLabel}
        />
}