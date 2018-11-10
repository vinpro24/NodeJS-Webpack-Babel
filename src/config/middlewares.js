import morgan from 'morgan';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import passport from 'passport';
import cors from 'cors';

import constants from '../constants';

export default app => {
    app.use(express.json());
    app.use(passport.initialize());

    if (constants.isDev) {
        app.use(morgan('dev'));
        app.use(cors());
    } else {
        app.use(compression());
        app.use(helmet());
        app.use(morgan('common'));
    }
    // app.use((req, res, next) => {
    //     // res.header('Access-Control-Allow-Credentials', true); // If needed
    //     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');
    //     res.header('Access-Control-Allow-Origin', '*');
    //     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
    //     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    //     next();
    // });
}
