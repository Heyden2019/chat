import { IDialog } from './Dialog';
import { IUser } from './User';
import mongoose from "mongoose"

export interface IMessage {
    user: IUser
    text: string
    dialog: IDialog
}

const messageSchema = new mongoose.Schema({
    user: { 
        type:  mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {type: String, required: true},
    dialog: {
        type: mongoose.Types.ObjectId,
        ref: 'Dialog',
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model("Message", messageSchema)