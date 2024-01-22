const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/js/index.js',
    module: {
        rules: [
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
}