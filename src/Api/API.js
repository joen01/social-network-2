import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "fd927b2a-8625-420a-8936-23e21d4dedc5"
    }
})

export const usersApi = {
    getUsers(currentPage, pageSize) {
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
    async followUsers(id, method) {
        const response = await instance[method](`follow/${id}`)
        return response.data;
    },

    getProfile(userId) {
        console.warn("Obsolete method. Please profileApi object")
        return profileApi.getProfile(userId)
    }
}

export const profileApi = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status})
    },
    savePhotos(file) {
        const formData = new FormData();
        formData.append("image", file);
        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    updateProfile(profile) {
        return instance.put(`profile`, profile)
    },
}

export const authMeApi = {
    auth() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false, captcha="") {
        return instance.post(`auth/login`, {email, password, rememberMe,captcha})
    },
    logout() {
        return instance.delete(`auth/login`)
    }

}
export const securityApi = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}