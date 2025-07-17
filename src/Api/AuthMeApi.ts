import {instance, ResultCodeCaptcha, ResultCodeEnum} from "src/Api/API";

type MeResponseType = {
    resultCode: ResultCodeEnum
    messages: Array<string>,
    data: {
        id: number,
        email: string,
        login: string
    }
}
type LoginResponseType = {
    resultCode: ResultCodeEnum | ResultCodeCaptcha
    messages: Array<string>,
    data: {
        userId: number
    }
}
type LogoutResponseType = {
    resultCode: ResultCodeEnum | ResultCodeCaptcha
    messages: Array<string>,
    data: {}
}
export const authMeApi = {
    auth() {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout() {
        return instance.delete<LogoutResponseType>(`auth/login`)
            .then(res => res.data)
    }
}