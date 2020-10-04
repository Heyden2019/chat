import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import http from "http"
import socket from "socket.io"
import chatSocket from "./sockets/chat"
import RoutesCreator from "./routes/RoutesCreator"
import { sessionMiddleware } from "./util/sessionMiddleware"
import './util/mongoConnect'

const app = express()
const server = new http.Server(app)
const io = socket(server, {serveClient: true})

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(bodyParser.json())

app.use(sessionMiddleware);
io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res, next)
})

chatSocket(io)
RoutesCreator(app, io)

server.listen(process.env.PORT as string, () => {
    console.log("server started on port: " + process.env.PORT as string)
})

export default app