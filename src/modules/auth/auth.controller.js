import bcrypt from 'bcrypt'
import User from '../user/user.model'

import AuthService from '../../services/Auth'
import AuthProvider from '../../services/authProvider'

import {
    providerPhoneNumberSchema, providerFacebookSchema, providerGoogleSchema, providerEmailSchema
} from './auth.schema'

export async function authJwt(req, res, next) {
    try {
        const token = AuthService.getTokenFromHeaders(req)
        if (!token) throw new Error()

        const user = await User.findById(token.id)
        if (!user) throw new Error()

        req.user = user
        next()
    } catch (error) {
        req.user = null
        res.sendStatus(401)
    }
}

export async function loginWithEmail(req, res) {
    try {
        const { email, password, provider } = req.body
        await providerEmailSchema.validate({ email, password, provider })

        const user = await User.findOne({ providers: { $elemMatch: { uid: email, type: provider } } })
        if (!user) {
            throw new Error('Email does not exist.')
        }

        // CHECK PASSWORD
        const userProvider = user.providers.find(i => i.uid === email && i.password)
        if (!userProvider) throw new Error('Email/password is not match!')

        const isMatch = bcrypt.compareSync(password, userProvider.password)
        if (!isMatch) {
            res.status(500).json({ message: 'Password did not match.' })
        } else {
            const jwtToken = AuthService.createToken(user)
            res.status(200).json({ data: { token: jwtToken, user } })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export async function signUpWithEmail(req, res) {
    try {
        const { email, password, provider } = req.body
        await providerEmailSchema.validate({ email, password, provider })

        let user = await User.findOne({ providers: { $elemMatch: { uid: email, type: provider } } })
        if (user) {
            throw new Error('Email is exist.')
        }

        user = await User.create({ info: { email }, providers: [{ uid: email, password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)), type: provider }] })

        const jwtToken = AuthService.createToken(user)
        res.status(200).json({ data: { token: jwtToken, user } })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export async function loginWithPhoneNumber(req, res) {
    try {
        const { phonenumber, provider } = req.body
        await providerPhoneNumberSchema.validate({ phonenumber, provider })

        let user = await User.findOne({ providers: { $elemMatch: { uid: phonenumber, type: provider } } })
        if (!user) {
            user = await User.create({ info: { phonenumber }, providers: [{ uid: phonenumber, type: provider }] })
        }
        const jwtToken = AuthService.createToken(user)
        res.status(200).json({ data: { token: jwtToken, user } })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export async function loginWithFacebook(req, res) {
    try {
        const { token, provider } = req.body
        await providerFacebookSchema.validate({ token, provider })
        const data = await AuthProvider.Facebook.authAsync(token)

        let user = await User.findOne({ providers: { $elemMatch: data.provider } })
        if (!user) {
            user = await User.create({ info: data, providers: [data.provider] })
        }

        const jwtToken = AuthService.createToken(user)
        res.status(200).json({ data: { token: jwtToken, user } })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export async function loginWithGoogle(req, res) {
    try {
        const { token, provider } = req.body
        await providerGoogleSchema.validate({ token, provider })
        const data = await AuthProvider.Google.authAsync(token)

        let user = await User.findOne({ providers: { $elemMatch: data.provider } })
        if (!user) {
            user = await User.create({ info: data, providers: [data.provider] })
        }

        const jwtToken = AuthService.createToken(user)
        res.status(200).json({ data: { token: jwtToken, user } })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
