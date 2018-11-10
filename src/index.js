import http from 'http'
import express from 'express'
import socketIO from 'socket.io'

import constants from './constants'
import middleware from './config/middlewares'
import database from './config/database'
import apiRoutes from './routes/apiRoutes'
import { socketConnection } from './modules/socketio/socketio.controller'

const app = express()
const server = http.Server(app)

app.io = socketIO(server)

server.listen(constants.PORT, () => {
    console.log(`Server started on port ${constants.PORT}`)
    database()
    middleware(app)
    apiRoutes(app)
    socketConnection(app.io)
})
