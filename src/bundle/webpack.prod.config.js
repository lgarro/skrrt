/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const moduleRules = {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['babel-loader'],
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['eslint-loader']
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
        }
    ],
}
const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/client/index.html',
    filename: './index.html',
    hash: true,
    minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
    }
})
const miniCSSPlugin = new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css'
})

const hotModulePlugin = new webpack.HotModuleReplacementPlugin()

const namedModulesPlugin = new webpack.NamedModulesPlugin()

const frontendBundle = {
    target: 'web',
    mode: 'development',
    entry: {
        app: ['./src/client/index.jsx'],
        vendor: ['react'] // extract chunk
    },
    output: {
        path: path.resolve(__dirname, './../../dist/public'),
        filename: '[name].[hash].js',
    },
    module: moduleRules,
    plugins: [
        new CleanWebpackPlugin(['dist']),
        htmlPlugin,
        miniCSSPlugin,
        hotModulePlugin,
        namedModulesPlugin
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                compress: {
                    warnings: false,
                    comparisons: false
                },
                output: {
                    comments: false,
                    ascii_only: true
                },
                sourceMap: true
            })
        ]
    }
}
const backendBundle = {
    target: 'node',
    mode: 'development',
    entry: {
        app: ['./src/api/index.js']
    },
    output: {
        path: path.resolve(__dirname, './../../dist'),
        filename: 'bundle-back.js'
    },
    externals: [nodeExternals()],
}
module.exports = [frontendBundle, backendBundle]
