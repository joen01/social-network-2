import {GetItemsType, instance, ResponseType} from 'src/Api/API';

export const usersApi = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    },
    async followUsers(id: number, method: "post" | "delete") {
        const response = await instance[method]<ResponseType>(`follow/${id}`)
        return response.data;
    },
}