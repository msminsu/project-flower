const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const promoConfig = require('./project.config');

function banner(){
    let date = new Date();
    return [
        `@project: ${promoConfig.name}`,
        `@author: msminsu`,
        '@update: ' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    ].join('\n');
}

module.exports = {
    entry: {
        index: `${__dirname}/src/js/${promoConfig.entry.js}`
    },

    output: {
        filename: '[name].js',
        path: `${__dirname}/dist/js`
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-object-assign']
                },
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ]
            }
        ]
    },

    watchOptions: {
        poll: true,
        aggregateTimeout: 1000
    },

    plugins: [
        new webpack.BannerPlugin({
            banner: banner()
        }),
        new UglifyJSPlugin({sourceMap: true})
    ],

    devtool: 'source-map'
};
