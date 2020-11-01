import { validationResult } from "express-validator"
import User from "./../models/User"
import { myReq } from "./../types"
import argon2 from 'argon2'
import express from 'express'
import getUsersUrlParser from "./../util/getUsersUrlParser"

export class UsersController {
    io

    constructor(io) {
        this.io = io
    }

    getUsers = (req: myReq, res: express.Response) => {
        const {searchText, page, newFirst} = getUsersUrlParser(req.query)
        const portion = +(process.env.USERS_PORTION as string)
        const conditions = searchText ? {fullname: {$regex: `${searchText}`, $options: 'i'}} : {}
        User.find(conditions).select("-password").sort({createdAt: newFirst ? -1 : 1}).skip((page - 1) * portion).limit(portion)
        .then(async (users) => {
            const totalUsers = await User.find(conditions).select("-password").countDocuments()
            res.status(200).json({users, totalUsers})
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
    }

    logout = (req: myReq, res: express.Response) => {
        req.session.destroy(err => {
            if (err) {
                return res.send({ message: 'Logout error' })
            }
            res.clearCookie(process.env.COOKIE_NAME as string)
            return res.status(200).json({ message: 'Logout success' })
        })
    }

    getUserById = (req: myReq, res: express.Response) => {
        User.findById(req.params.id).select("-password")
        .then(user => {
            user 
            ? res.status(200).json(user) 
            : res.status(404).json({ message: "404 not found" })
        })
        .catch(err => {
            res.status(404).json({ message: "404 not found" })
        })
    }

    updateUserById = async (req: myReq, res: express.Response) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array({onlyFirstError: true})})
        }
    
        if(req.body.password) {
            req.body.password = await argon2.hash(req.body.password)
        } 
    
        User.findOneAndUpdate({_id: req.session.userId}, {
            ...req.body, 
            fullname: req.body.firstName + ' ' + req.body.lastName
        }).select('-password')
        .then((user: any) => {
            user
            ? res.status(200).json(user)
            : res.status(500).json({message: "Server error"})
        })
        .catch(err => {
            res.status(500).json({message: "Server error"})
        })
    }

    getMe = (req: myReq, res: express.Response) => {
        if (!req.session?.userId) {
            return res.status(200).json(null)
        }
        User.findById(req.session.userId)
        .then((user: any) => {
            user = user.toObject()
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({message: "Server error"})
        })
    }

    register = async (req: myReq, res: express.Response) => {
        delete req.body.image_id
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array({onlyFirstError: true})}) 
        }
    
        const hashedPassword = await argon2.hash(req.body.password)
        const user = await new User({
            ...req.body,
            fullname: req.body.firstName + ' ' + req.body.lastName,
            password: hashedPassword,
        })
    
        user.save()
        .then((user: any) => {
            req.session.userId = user._id
            user = user.toObject()
            delete user.password
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).send('Server Error')
        })
    }

    login = (req: myReq, res: express.Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array({onlyFirstError: true})})
        }
        User.findOne({ email: req.body.email })
        .then((user: any) => {
            req.session.userId = user._id
            user = user.toObject()
            res.status(200).json(user)
        })
        .catch(() => {
            res.status(500).json({message: "Server error"})
        })
    }

    deleteUserById = async (req: myReq, res: express.Response) => {
        await User.deleteOne({ _id: req.session.userId })
        .then(() => {
            req.session.destroy(err => {
                if (err) {
                    return res.status(500).json({message: "Server error"})
                }
                res.clearCookie(process.env.COOKIE_NAME as string)
                return res.status(200).json({ message: 'You were deleted successful' })
            })
        })
        .catch(err => {
            res.status(500).json({message: "Server error"})
        })
    }
}