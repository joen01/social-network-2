import {ProfileType} from "src/Types/Types";
import {instance} from "src/Api/API";

export const profileApi = {
    getProfile(userId: number | null) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: number | null) {
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
    updateProfile(profile: ProfileType | null) {
        return instance.put(`profile`, profile)
    },
}