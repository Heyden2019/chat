export type EmailAndPasswordType = {
    email: string,
    password: string
}

export type RegisterFieldsType = {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export type ResponseType = {
    errors?: ErrorType[]
}

export type ErrorType = {
    msg: string,
    param: string
}

export interface UsersState {
    users: Array<User>,
    currentUser: null | User
    targetUser: null | User
    totalUsers: null | number
    loading: "with_pagination" | "without_pagination" | null
}

export interface User {
    fullname: string;
    email: string;
    photo_url: null | string; 
    _id: string,
    last_seen: Date
}

export type MessagesState = {
    messages: Message[]
    partner: User | null
    hasMore: boolean
    isLoading: boolean
}

export type Message = {
    text: string
    user: User
    createdAt: Date
    _id: string
}

export type DialogsState = {
    dialogs: Dialog[]
    isLoading: boolean
}

export type Dialog = {
    lastMessage: Message
    users: User[]
    _id: string
}
