const nodeExternals = require('webpack-node-externals');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production'; // true or false

module.exports = {
    mode: process.env.NODE_ENV,
    target: 'node',
    externals: [nodeExternals()],
    entry: './src/index.js', // ['@babel/polyfill', './src/index.js'],
    output: {
        path: path.join(__dirname, 'build'),
        filename: isProd ? '[name].app.js' : '[name].dev.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader',
            },
        ],
    },
};
