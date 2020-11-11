import mongoose from 'mongoose';

export interface IUser {
    firstName: string
    lastName: string
    email: string
    password: string
    image_id: any
    last_seen: Date
}

const userSchema = new mongoose.Schema<IUser>({
    fullname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, select: false},
    last_seen: {type: Date, default: new Date()},
    photo_url: {
        type: String,
        default: null
    }
}, {
    timestamps: true
})

export default mongoose.model("User", userSchema)