import axios from "axios"
import { EmailAndPasswordType, RegisterFieldsType, ResponseType } from "./../types"


export const instance = axios.create({
    baseURL: "http://localhost:5000/",
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

export const usersAPI = {
    getUsers: async () => {
        const users = await instance.get("users")
        return users
    },

    login: async (emailAndPassword: EmailAndPasswordType): Promise<ResponseType> => {
        return instance.post("users/login", emailAndPassword)
        .then((res) => {
            return res.data
        })
        .catch(err => {
            if (err.response.status === 400) return err.response.data
            return Promise.reject()
        })
    },

    register: async (payload: RegisterFieldsType): Promise<ResponseType> => {
        return instance.post("users/register", payload)
        .then((res) => {
            return res.data
        })
        .catch(err => {
            if (err.response.status === 400) return err.response.data
            return Promise.reject()
        })
    },

    getCurrentUser: async (): Promise<ResponseType> => {
        return instance.get("users/me")
        .then((res) => {
            return res.data
        })
        .catch(err => {
            if (err.response.status === 401) return null
            console.log(err)
        })
    },

    logout: async () => {
        instance.get("users/logout")
        .catch(err => {
            console.log(err)
        })
    },

    getUserById: async (id: number) => {
        return await instance.get(`users/${id}`)
        .then((res) => {
            return res.data
        })
        .catch(err => {
            return null
        })
    },

    // setNewPhoto: async (photo: any) => {
    //     return await instance.post('images', photo)
    // }
}

export const dialogAPI = {
    getDialogs: async () => {
        const dialogs = await instance.get("dialogs")
        return dialogs
    }
}

export const messageAPI = {
    getMessages: async (id: string) => {
        const messages = await instance.get("messages/" + id)
        return messages
    },

    sendMessage: async (id: string, msg: string) => {
        await instance.post("messages/" + id, {msg})
    }
}