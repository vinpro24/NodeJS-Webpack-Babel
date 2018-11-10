import bcrypt from 'bcrypt';
import User from './user.model';
import { providerEmailSchema, providerPhoneNumberSchema, providerFacebookSchema, providerGoogleSchema } from './user.schema';

import AuthProvider from '../../services/authProvider';
import AuthService from '../../services/Auth';

export async function authJwt(req, res, next) {
    try {
        const token = AuthService.getTokenFromHeaders(req);
        if (!token) throw new Error();

        const user = await User.findById(token.id);
        if (!user) throw new Error();

        req.user = user;
        next();
    } catch (error) {
        req.user = null;
        return res.sendStatus(401);
    }
}

export async function getUserInfo(req, res) {
    try {
        res.status(200).json({ data: req.user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
