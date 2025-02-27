import * as Yup from "yup";


export const createValidationSchema = (fields) => {
    const schema = {};
    fields.forEach(field => {
        switch (field.name) {
            case 'post':
                schema[field.name] = Yup.string()
                    .required('Пост обязательный')
                    .min(5, 'Сообщение должно содержать хотя бы 5 символ')
                break;
            case 'message':
                schema[field.name] = Yup.string()
                    .required('Сообщение обязательно')
                    .min(10, 'Сообщение должно содержать хотя бы 10 символ')
                break;
            default:
                break;
        }
    })
    return Yup.object(schema)
}