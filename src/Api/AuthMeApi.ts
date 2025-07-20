import {instance, ResultCodeCaptcha, ResultCodeEnum,ResponseType} from "src/Api/API";

type MeResponseDataType = {
    id: number,
    email: string,
    login: string
}

type LoginResponseDataType = {
        userId: number
}


export const authMeApi = {
    auth() {
        return instance.get<ResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<ResponseType<LoginResponseDataType,ResultCodeEnum | ResultCodeCaptcha>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout() {
        return instance.delete<ResponseType<ResultCodeEnum | ResultCodeCaptcha>>(`auth/login`)
            .then(res => res.data)
    }
}