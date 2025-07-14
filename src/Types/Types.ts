export type PostsType = {
    id: number
    message: string
    like: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
    [key: string]: string
}

export type ProfileType = {
    aboutMe:string
    userId?: number | undefined
    lookingForAJob?: string
    lookingForAJobDescription?: string
    fullName: string
    contacts: ContactsType
    photos?: PhotosType
}

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
    location: LocationType
}
export type LocationType = {
    city: string
    country: string
}

export type DialogsPageType = {
    dialogs: Array <DialogsType>,
    messages: Array <MessagesType>,
    nextId:number
}

export type DialogsType = {
    id: number,
    name: string
}

export type MessagesType = {
    id: number,
    message: string
}