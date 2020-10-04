import mongoose from "mongoose"

const statusSchema = new mongoose.Schema({
    title: {type: String, required: true},
    desc: {type: String, required: true},
}, {
    timestamps: true
})

export default mongoose.model("Status", statusSchema)