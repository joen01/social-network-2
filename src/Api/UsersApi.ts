import {instance} from "src/Api/API";

export const usersApi = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    },

    async followUsers(id: number, method: "post" | "delete") {
        const response = await instance[method](`follow/${id}`)
        return response.data;
    }
}