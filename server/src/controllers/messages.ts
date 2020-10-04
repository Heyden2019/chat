import { DialogsController } from './dialogs';
import { myReq } from "./../types"
import express from 'express'
import Dialog from "./../models/Dialog"
import Message from './../models/Message';
import User from './../models/User';
import socket from 'socket.io'

export class MessagesController {
    io: socket.Server

    constructor (io: socket.Server) {
        this.io =  io
    }

    createMessage = async (req: myReq, res: express.Response) => {
        const text = req.body.msg
        let dialog = await Dialog.findOne({users: { $all: [req.session.userId, req.params.userid]}})
        if (!dialog) {
            dialog = await new DialogsController().createDialog(req.session.userId, req.params.userid)
        }
        const message = await Message.create({user: req.session.userId, text, dialog})
        //@ts-ignore
        dialog.lastMessage = message._id
        dialog.save()

        await message.populate('user').execPopulate()
        await dialog.populate('users').populate('lastMessage').execPopulate()

        this.io.to(req.params.userid).emit("SERVER:NEW_MESSAGE_IN_DIALOG_WITH" + req.session.userId, message)
        this.io.to(req.session.userId).emit("SERVER:NEW_MESSAGE_IN_DIALOG_WITH" + req.params.userid, message)
        this.io.to(req.params.userid).emit("SERVER:DIALOG_WAS_UPDATED", dialog)
        this.io.to(req.session.userId).emit("SERVER:DIALOG_WAS_UPDATED", dialog)
        res.status(200).send('success')
    }

    getMessagesByPartnerId = async (req: myReq, res: express.Response) => {
        const dialog = await Dialog.findOne({users: { $all: [req.session.userId, req.params.userid]}})
        const partner = await User.findById(req.params.userid)
        console.log('partner', partner)
        if (!dialog) {
            if(partner) {
                return res.status(200).json({
                    messages: [],
                    partner
                })
            } else {
                return res.status(404).json({
                    message: "Not Found"
                })
            }
        }
        const messages = await (await Message.find({dialog}).populate('user').sort({'createdAt': -1}).limit(30)).reverse()
        res.status(200).json({messages, partner})
    }
}