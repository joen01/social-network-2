import axios from "axios";

export  const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "fd927b2a-8625-420a-8936-23e21d4dedc5"
    }
})

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeCaptcha {
    Captcha = 10
}

