const path = require('path');
const nodeExternals = require('webpack-node-externals');
const package = require('./package.json');

module.exports = {
    entry: './src/index.js',
    target: 'node',
    externals: [nodeExternals({ modulesFromFile: true })],
    output: {
        path: path.join(__dirname, 'build'),
        filename: package.name + '.app.js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                exclude: /(node_modules)/,
                test: /\.js$/
            }
        ]
    }
}
