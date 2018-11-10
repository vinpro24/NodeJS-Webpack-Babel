import Socket from './socket.model'
import Rooms from './rooms.model'

export const sockets = new Socket()
export const rooms = new Rooms()

export const socketConnection = (io) => {
    io.on('connection', (socket) => {
        const { uid } = socket.handshake.query
        if (uid) {
            socket.userId = uid
            sockets.add(socket)
        }

        socket.on('disconnect', () => {
            sockets.remove(socket)
            rooms.disconnect(socket)
        })

        socket.on('join-room', (roomName, callback) => {
            if (!roomName) {
                if (callback) callback('Room name is required.')
            } else {
                if (callback) callback()
                rooms.join(roomName, socket)
            }
        })

        socket.on('leave-room', (roomName, callback) => {
            if (!roomName) {
                if (callback) callback('Room name is required.')
            } else {
                if (callback) callback()
                rooms.remove(roomName, socket)
            }
        })

        socket.on('client-send-data', (action, callback) => {
            switch (action.type) {
                case 'CONVERSATION.NEWMESSAGES': {
                    break
                }
                default:
                    break
            }
        })
    })
}
