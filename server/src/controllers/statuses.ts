import Status from "./../models/Status"
import { myReq } from "./../types"
import express from 'express'
import { validationResult } from "express-validator"

export class StatusesController {
    getAllStatuses = (req: myReq, res: express.Response) =>  {
        Status.find()
        .then(statuses => {
            res.status(200).json(statuses)
        })
        .catch(err => {
            res.status(500).json({message: "Server error"})
        })
    }

    getStatusById = (req: myReq, res: express.Response) => {
        Status.findById(req.params.id)
        .then(status => {
            status
            ? res.status(200).json(status)
            : res.status(404).json({ message: "404 not found" })
        })
        .catch(err => {
            res.status(404).json({ message: "404 not found" })
        })
    }

    createStatus = (req: myReq, res: express.Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array({onlyFirstError: true})})
        }
    
        const status = new Status({...req.body})
    
        status.save()
        .then(status => {
            res.status(201).json(status)
        })
        .catch(err => {
            res.status(500).json({message: "Server error"})
        })
    }

    updateStatusById = (req: myReq, res: express.Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array({onlyFirstError: true})})
        }
        
        Status.findByIdAndUpdate(req.params.id, req.body)
        .then((status) => {
            status
            ? res.status(200).json(status)
            : res.status(404).json({ message: "404 not found" })
        })
        .catch(() => {
            res.status(404).json({ message: "404 not found" })
        })
    }

    deleteStatus = (req: myReq, res: express.Response) => {
        Status.findByIdAndDelete(req.params.id)
        .then(status => {
            status
            ? res.status(200).json({ message: "Deleted successful" })
            : res.status(404).json({ message: "404 not found" })
        })
        .catch(() => {
            res.status(404).json({ message: "404 not found" })
        })
    }
}