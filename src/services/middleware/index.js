import morgan from 'morgan'
import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import passport from 'passport'
import cors from 'cors'

import config from '../../config'

export default (app) => {
    app.use(express.json())
    app.use(passport.initialize())

    if (config.isDev) {
        app.use(morgan('dev'))
        app.use(cors())
    } else {
        app.use(compression())
        app.use(helmet())
        app.use(morgan('common'))
    }
}
