import mongoose from 'mongoose';

export interface IUser {
    firstName: string
    lastName: string
    email: string
    password: string
    image_id: any
}

const userSchema = new mongoose.Schema<IUser>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, select: false},
    image_id: {
        type: mongoose.Types.ObjectId,
        default: null,
        ref: "Image"
    }
}, {
    timestamps: true
})

// userSchema.pre("save", function (next) {
//     if (this.isModified("password") || this.isNew()) {
//         this.password = bcrtypt.hashSync(this.password, 12);
//       }
//     next();
// })

export default mongoose.model("User", userSchema)