import multer from "multer"
import path from "path"

export const UPLOAD_PATH = path.resolve(__dirname, '../images')
export const upload = multer({
  dest: UPLOAD_PATH ,
  limits: {fileSize: 1024*1024, files: 1},
  fileFilter: (req, file, cb) => {
     if (['.jpg', '.jpeg', '.png'].includes(path.extname(file.originalname))) {
         return cb(null, true)
     }
     return cb(new Error("Wrong format"))
  }
}).single('Image')