var path = require('path');
var webpack = require('webpack');
var helpers = require('./helpers');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': helpers.root('polyfills.ts'),
        'vendor': helpers.root('vendor.ts'),
        'app': helpers.root('main.ts')
    },

    resolve: {
        extensions: ['', '.ts', '.js'],
        alias: {
            'jquery': helpers.root('node_modules/jquery/src/jquery'),
            'io': helpers.root('node_modules/socket.io-dist/socket.io')
        }
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                exclude: [/\.(spec|e2e)\.ts$/],
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|ico)([\?]?.*)$/,
                loader: 'file?name=assets/images/[name].[ext]'
            },
            {
                test: /\.(svg|woff|woff2|ttf|eot)([\?]?.*)$/,
                loader: 'file?name=assets/fonts/[name].[ext]'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(['css?sourceMap'])
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract(['css','less'])
            },
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css','sass?includePaths[]='+helpers.root('node_modules/compass-mixins/lib')])
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new CopyWebpackPlugin([
            {from: helpers.root('assets/icon'), to: 'assets/icon'}
        ]),

        new HtmlWebpackPlugin({
            template: helpers.root('index.html')
        }),

        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            'window.jQuery': 'jquery',
            moment: 'moment',
            io: 'io'
        })
    ]
};