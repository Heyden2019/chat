import mongoose from 'mongoose'

const Image = new mongoose.Schema({
  filename: String,
  size: String,
  ext: String,
  url: String,
  user_id: {
      type:  mongoose.Types.ObjectId,
      required: true,
      ref: 'User'
  }
}, {
  timestamps: true
})

export default mongoose.model('Image', Image)