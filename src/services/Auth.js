import jwt from 'jsonwebtoken'
import config from '../config'

const JwtSecret = config.JWT_SECRET

const JWT_OPTS = {
    expiresIn: '7d',
    issuer: 'InStore'
}

const createToken = (user) => {
    if (!user && !user._id) {
        return null
    }

    const payload = {
        id: user._id
    }

    return jwt.sign(payload, JwtSecret, JWT_OPTS)
}

const verifyToken = (token) => {
    return jwt.verify(token, JwtSecret, JWT_OPTS)
}

const getTokenFromHeaders = (req) => {
    const token = req.headers.authorization

    if (token) {
        const arr = token.split(' ')

        if (arr[0] === 'Bearer' && arr[1]) {
            try {
                return verifyToken(arr[1])
            } catch (error) {
                return null
            }
        }
    }

    return null
}

export default {
    createToken,
    verifyToken,
    getTokenFromHeaders
}
