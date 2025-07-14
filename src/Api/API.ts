import axios from "axios";
import {ProfileType} from "src/Types/Types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "fd927b2a-8625-420a-8936-23e21d4dedc5"
    }
})

export const usersApi = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    },
    // followUsers(id, method) {
    //     return instance[method](`follow/${id}`)
    //         .then(response => {
    //             return response.data;
    //         })
    // },
    async followUsers(id: number, method: "post" | "delete") {
        const response = await instance[method](`follow/${id}`)
        return response.data;
    },
    getProfile(userId: number|null) {
        console.warn("Obsolete method. Please profileApi object")
        return profileApi.getProfile(userId)
    }
}

export const profileApi = {
    getProfile(userId: number|null) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: number|null) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status})
    },
    savePhotos(file: any) {
        const formData = new FormData();
        formData.append("image", file);
        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    updateProfile(profile: ProfileType|null) {
        return instance.put(`profile`, profile)
    },
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeCaptcha {
    Captcha = 10
}

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
    resultCode: ResultCodeEnum |ResultCodeCaptcha
    messages: Array<string>,
    data: {
        userId: number
    }
}
type LogoutResponseType = {
    resultCode: ResultCodeEnum
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
export const securityApi = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}