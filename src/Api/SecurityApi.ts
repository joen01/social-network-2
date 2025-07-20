import {instance} from "src/Api/API";

type GetCaptchaUrlType={
    url:string
}
export const securityApi = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlType>(`security/get-captcha-url`)
    }
}