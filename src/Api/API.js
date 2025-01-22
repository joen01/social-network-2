import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "955d0b76-71b7-4ef2-9f9d-ea2df513ccf2"}
})
  


export const usersApi = {
    getUsers(currentPage,pageSize)  {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    }
}

export const followUsersApi = {
    followUsers(id,rest) {
        return instance[rest](`follow/${id}`)
            .then(response => {
                return response.data;
            })

    }
}
