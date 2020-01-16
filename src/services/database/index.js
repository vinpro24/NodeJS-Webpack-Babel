// import mongoose from 'mongoose'
import config from '../../config'



// Connect // Connect Database
export default () => {

    // try {
    //     mongoose.Promise = global.Promise
    //     mongoose.set('debug', true)
    //     mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true })
    // } catch (error) {
    //     mongoose.createConnection(config.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true })
    // }
    // mongoose.connection.on('error', err => console.log(err))
    // mongoose.connection.once('open', () => console.log('MongoDB Running...')).on('error', (e) => { throw e })
}
