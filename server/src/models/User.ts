import mongoose from 'mongoose';

export interface IUser {
    firstName: string
    lastName: string
    email: string
    password: string
    image_id: any
}

const userSchema = new mongoose.Schema<IUser>({
    fullname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, select: false},
    photo_url: {
        type: String,
        default: null
    }
}, {
    timestamps: true
})

export default mongoose.model("User", userSchema)