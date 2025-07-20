import {PhotosType, ProfileType} from "src/Types/Types";
import {instance, ResponseType} from "src/Api/API";

type SavePhotosResType={
    photos:PhotosType
}
export const profileApi = {
    getProfile(userId: number | null) {
        return instance.get<ProfileType>(`profile/${userId}`)
    },
    getStatus(userId: number | null) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, {status: status})
    },
    savePhotos(file: any) {
        const formData = new FormData();
        formData.append("image", file);
        return instance.put<ResponseType<SavePhotosResType>>(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    updateProfile(profile: ProfileType | null) {
        return instance.put<ResponseType>(`profile`, profile)
    },
}