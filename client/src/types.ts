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
}

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    image_id: string; 
    _id: number
}

export type MessagesState = {
    messages: Message[]
    partner: User | null
}

export type Message = {
    text: string
    user: User
    createdAt: Date
    _id: string
}

export type DialogsState = {
    dialogs: Dialog[]
}

export type Dialog = {
    lastMessage: Message
    users: User[]
    _id: string
}
