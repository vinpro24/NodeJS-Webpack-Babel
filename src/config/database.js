import mongoose from 'mongoose';
import constants from '../constants';

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

// Connect
export default () => {
    try {
        mongoose.connect(constants.MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true })
    } catch (error) {
        mongoose.createConnection(constants.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true })
    }
    mongoose.connection.on('error', err => console.log(err))
    mongoose.connection.once('open', () => console.log('MongoDB Running...')).on('error', (e) => { throw e })
}

