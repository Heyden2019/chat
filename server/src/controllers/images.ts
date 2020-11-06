import express from 'express';
// import path from "path";
import User from "./../models/User";
import Image from "./../models/Image";
// import fs from 'fs'
import { myReq } from "./../types";
// import { upload, UPLOAD_PATH } from "../util/multerUploader";
import cloudinary from './../util/cloudinary';

export class ImageController {
    uploadNewPhoto = (req:  myReq & {file: any}, res: express.Response) => {
        cloudinary.v2.uploader.upload_stream({}, (
            error: cloudinary.UploadApiErrorResponse | undefined,
            result: cloudinary.UploadApiResponse | undefined
        ) => {
            if (error || !result) {
                return res.status(500).json({
                  status: "error",
                  message: error || "upload error",
                });
            }

            const photo = new Image({
                filename: result.original_filename,
                size: result.bytes,
                ext: result.format,
                url: result.url,
                user_id: req.session.userId
            })

            photo.save()
            .then(async (img) => {
                if (!img) {
                    res.status(500).json({
                        message: "Server error",
                    });
                } else {
                    // if (prevImg) {
                    //     await fs.unlink(path.resolve(UPLOAD_PATH, prevImg.filename), () => { })
                    //     await prevImg.remove().catch(() => { })
                    // }
                    User.findByIdAndUpdate(req.session.userId, { photo_url: result.url })
                        .then(user => {
                            user
                                ? res.status(200).json(img)
                                : res.status(500).json({ message: "Server error" })
                        })
                }
            })
            .catch((err: any) => {
                res.status(500).json({
                    message: err,
                });
            });
        }).end(req.file.buffer)
    }










    // uploadNewPhoto = async (req:  myReq & {file: any}, res: express.Response) => {
    //     upload(req, res, (err: any): any => {
    //         if (err) {
    //             if (err.code === 'LIMIT_FILE_SIZE') {
    //                 return res.status(400).json(err)
    //             }
    //             if (err.code === 'LIMIT_FILE_COUNT') {
    //                 return res.status(400).json(err)
    //             }
    //             return res.status(400).json({ message: err.message });
    //         }
    //         if(!req.file) {
    //             return res.status(400).json({ message: "File is required" });
    //         }
    
    //         const image = {
    //             filename: req.file.filename,
    //             originalname: req.file.originalname,
    //             user_id: req.session.userId
    //         }
    
    //         let prevImg: any
    
    //         Image.findOne({ user_id: req.session.userId })
    //             .then(img => {
    //                 prevImg = img || null
    //             })
    //             .catch(() => { })
    
    //         Image.create(image)
    //             .then(async (img) => {
    //                 if (!img) {
    //                     res.status(500).json({ message: "Server error" })
    //                 } else {
    //                     if (prevImg) {
    //                         await fs.unlink(path.resolve(UPLOAD_PATH, prevImg.filename), () => { })
    //                         await prevImg.remove().catch(() => { })
    //                     }
    //                     User.findByIdAndUpdate(req.session.userId, { image_id: img._id })
    //                         .then(user => {
    //                             user
    //                                 ? res.status(200).json(img)
    //                                 : res.status(500).json({ message: "Server error" })
    //                         })
    //                 }
    //             })
    //             .catch(() => res.status(500).json({ message: "Server error" }))
    //     })
    // }

    // getPhotoById = (req: myReq, res: express.Response) => {
    //     Image.findById(req.params.id)
    //     .then((img: any) => {
    //         img
    //         ? fs.createReadStream(path.resolve(UPLOAD_PATH, img.filename)).pipe(res)
    //         : res.status(404).json({ message: "404 not found" })
    //     })
    //     .catch(() => {
    //         res.status(404).json({ message: "404 not found" })
    //     })
    // }
}