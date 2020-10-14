import axios from "axios"
import os from "os";
import { EmailAndPasswordType, RegisterFieldsType, ResponseType } from "./../types"

const port = process.env.PORT || 3000;
let baseURL: string = 'http://' + os.hostname() + ':' + port + '/api/';

export const instance = axios.create({
    baseURL: baseURL,
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
        return await instance.post("users/login", emailAndPassword)
        .then((res) => {
            return res.data
        })
        .catch(err => {
            if (err.response.status === 400) return err.response.data
            throw new Error(err.message);
            
            // return Promise.reject()
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

    getUserById: async (id: string) => {
        return await instance.get(`users/${id}`)
        .then((res) => {
            return res.data
        })
        .catch(err => {
            return null
        })
    }
}

export const dialogAPI = {
    getDialogs: async () => {
        const dialogs = await instance.get("dialogs")
        return dialogs
    }
}

export const messageAPI = {
    getMessages: async (id: string, createdAt: Date | string = "") => {
        return await instance.get("messages/" + id, {params: {createdat: createdAt}})
        .then( msgs => msgs.data)
        .catch(e => console.log(e))
    },

    sendMessage: async (id: string, msg: string) => {
        await instance.post("messages/" + id, {msg})
    }
}