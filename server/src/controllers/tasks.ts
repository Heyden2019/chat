import { validationResult } from "express-validator"
import Task from "./../models/Task"
import { myReq } from "./../types"
import express from 'express';

export class TasksController {

    getTasks = (req: myReq, res: express.Response) => {
        Task.find(req.query.status_id ? { status_id: req.query.status_id } : {})
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(() => {
            res.status(404).json({ message: "404 not found" })
        })
    }

    getTaskById = (req: myReq, res: express.Response) => {
        Task.findById(req.params.id)
        .then(task => {
            task
            ? res.status(200).json(task)
            : res.status(404).json({ message: "404 not found" })
        })
        .catch(err => {
            res.status(404).json({ message: "404 not found" })
        })
    }

    createTask = (req: myReq, res: express.Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array({onlyFirstError: true})})
        }
     
         const task = new Task({
             ...req.body,
             user_id: req.session.userId
         })
         task.save()
         .then(task => {
             res.status(201).json(task)
         })
         .catch(err => {
             res.status(500).json({message: "Server error"})
         })
     }

     updateTask = (req: myReq, res: express.Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array({onlyFirstError: true})})
        }
        
        Task.findByIdAndUpdate(req.params.id, {
            ...req.body,
            user_id: req.session.userId
        })
        .then(task => {
            task
            ? res.status(200).json(task)
            : res.status(404).json({ message: "404 not found" })
        })
        .catch(err=> {
            res.status(404).json({ message: "404 not found" })
        })
    }

    deleteTask = (req: myReq, res: express.Response) => {
        Task.findByIdAndDelete(req.params.id)
        .then(task => {
            task
            ? res.status(200).json({message: "Deleted successful"})
            : res.status(404).json({ message: "404 not found" })
        })
        .catch(err => {
            res.status(404).json({ message: "404 not found" })
        })
    }
}