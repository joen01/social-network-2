import * as Yup from "yup";


export const createValidationSchema = (fields) => {
    const schema = {};
    fields.forEach(field => {
        switch (field.name) {
            case 'fullName':
                schema[field.name] = Yup.string().required('Обязательно')
                    .required('Имя обязательно')
                    .min(2, '')
                    .max(15, "max simbols")
                break;
            case 'post':
                schema[field.name] = Yup.string()
                    .required('Пост обязательный')
                    .min(5, 'Сообщение должно содержать хотя бы 5 символ')
                    .max(15, "max simbols")
                break;
            case 'message':
                schema[field.name] = Yup.string()
                    .required('Сообщение обязательно')
                    .min(10, 'Сообщение должно содержать хотя бы 10 символ')
                    .max(15, "max symbols")
                break;
            case 'email':
                schema[field.name] = Yup.string()
                    .required('Email обязательно')
                    .email('email invalid')
                break;
            case 'password':
                schema[field.name] = Yup.string()
                    .required('Password обязательно')
                    .min(6, 'Password должно содержать хотя бы 6 символ')
                break;
            default:
                break;
        }
    })
    return Yup.object(schema)
}