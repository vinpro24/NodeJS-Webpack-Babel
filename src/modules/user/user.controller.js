import User from './user.model'

export async function getUserInfo(req, res) {
    try {
        res.status(200).json({ data: req.user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            throw new Error(`Not found user with ${req.params.id}`)
        }
        res.status(200).json({ data: user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
