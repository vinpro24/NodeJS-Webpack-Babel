import { authJwt } from '../modules/auth/auth.controller'

import authRoutes from '../modules/auth/auth.routes';
import userRoutes from '../modules/user/user.routes';

export default app => {
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/authenticate', authJwt, (req, res) => res.status(200).json({ data: req.user.toUserJson() }))
    app.use('/api/v1/user', authJwt, userRoutes);
    // server.get('/user', (req, res, next) => {
    //     res.send({ msg: 'Vinh' })
    //     next()
    // })
}