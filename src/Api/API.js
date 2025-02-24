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

    followUsers(id, method) {
        return instance[method](`follow/${id}`)
            .then(response => {
                return response.data;
            })

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
    }
}

export const authMeApi = {
    auth() {
        return instance.get(`auth/me`)
    },
    authLoginPost() {
        return instance.post(`auth/login`)
    },
    authLoginDelete() {
        return instance.delete(`auth/login`)
    }

}