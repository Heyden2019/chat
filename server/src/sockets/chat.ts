import socket from "socket.io"

export default (io: socket.Server) => {
    io.on( "connection", async function (socket: socket.Socket & {user?: any}) {
        const userId = socket.request?.session?.userId
        if (userId) {
            socket.join(userId);
        }
    })
}