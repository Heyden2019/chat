import User from './../models/User';
import { myReq } from "./../types"
import express from 'express'
import Dialog from "./../models/Dialog"

export class DialogsController {
    getAllDialogs = (req: myReq, res: express.Response) => {
        Dialog.find({users: req.session.userId}).populate('lastMessage').populate('users').sort({'updatedAt': -1})
        .then(dialogs => {
            res.status(200).json(dialogs)
        })
        .catch(err => {
            console.log('err', err)
            res.json({message: "Finding Error"})
        })
    }

    createDialog = async (userId: string, partnerId: string) => {
        const user = await User.findById(userId)
        const partner = await User.findById(partnerId)
        return await Dialog.create({users: [user, partner]})
        .then(dialog => {
            return dialog
        })
    }
}