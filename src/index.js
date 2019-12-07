import http from 'http'
import express from 'express'
import socketIO from 'socket.io'

import config from './config'
import middleware from './services/middleware'
// import database from './services/database'
import apiRoutes from './routes/apiRoutes'
// import { socketConnection } from './modules/socketio/socketio.controller'

const app = express()
const server = http.Server(app)

app.io = socketIO(server)

server.listen(config.PORT, () => {
    console.log(`Server started on port ${config.PORT}`)
    // database()
    middleware(app)
    apiRoutes(app)
    // socketConnection(app.io)
})
