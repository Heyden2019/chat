import {IUser} from './User';
import {IMessage} from './Message';
import mongoose from "mongoose"

export interface IDialog {
    users: IUser[]
    lastMessage: IMessage
}

const dialogSchema = new mongoose.Schema<IDialog>({
    users: [{ 
        type:  mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
        
    }],
    lastMessage: {
        type: mongoose.Types.ObjectId,
        ref: 'Message',
        default: null
    }
}, {
    timestamps: true
}
)

export default mongoose.model("Dialog", dialogSchema)