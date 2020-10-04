import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    user_id: {
        type:  mongoose.Types.ObjectId,
        ref: 'User',
        required: true
        },
    status_id: {
        type:  mongoose.Types.ObjectId,
        ref: 'Status',
        required: true
        },
    title: {type: String, required: true},
    desc: {type: String, required: true}
}, {
    timestamps: true
})

export default mongoose.model("Task", taskSchema)