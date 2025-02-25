import * as Yup from "yup";

export const required = values => {
    if (values) return undefined;
    return "field is required"
}
export const maxLengthCreator = (maxValues) => values => {
    if (values.length>maxValues ) return `Max length ${maxValues} symbols`;
    return undefined
}

