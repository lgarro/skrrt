/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const clientPath = path.resolve(__dirname, './../client')
const serverPath = path.resolve(__dirname, './../api')
const moduleRulesClient = {


    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loaders: 'babel-loader',
            options: {
                extends: path.join(clientPath, '.babelrc'),
                cacheDirectory: true,
            },
            resolve: { extensions: ['.js', '.jsx'] }
        },
        {
            // test: /\.js$/,
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
            enforce: 'pre',
            options: {
                emitWarning: true,
            }
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'url-loader?limit=10000&name=images/[name].[hash].[ext]',
            ],
        },
        {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader?name=fonts/[name].[ext]',
        },
        {
            test: /\.scss$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader'
            ]
        }
    ],
}
const moduleRulesServer = {


    rules: [
        {
            test: /\.(js)$/,
            exclude: /node_modules/,
            loaders: 'babel-loader',
            options: {
                extends: path.join(serverPath, '.babelrc'),
                cacheDirectory: true,
            },
            resolve: { extensions: ['.js'] }
        },
        {
            test: /\.(js)$/,
            exclude: /node_modules/,
            enforce: 'pre',
            use: ['eslint-loader']
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'url-loader?limit=10000&name=images/[name].[hash].[ext]',
            ],
        },
        {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader?name=fonts/[name].[ext]',
        },
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

const namedModulesPlugin = new webpack.NamedModulesPlugin()

const frontendBundle = {
    target: 'web',
    mode: 'production',
    devtool: 'source-map',
    entry: {
        app: ['./src/client/index.jsx'],
        vendor: ['react'] // extract chunk
    },
    output: {
        path: path.resolve(__dirname, './../../dist/public'),
        filename: '[name].[hash].js',
    },
    module: moduleRulesClient,
    plugins: [
        new CleanWebpackPlugin(['dist']),
        htmlPlugin,
        miniCSSPlugin,
        namedModulesPlugin
    ]
}
const backendBundle = {
    target: 'node',
    mode: 'production',
    entry: {
        app: ['./src/api/index.js']
    },
    output: {
        path: path.resolve(__dirname, './../../dist'),
        filename: 'bundle-back.js'
    },
    module: moduleRulesServer,
    externals: [nodeExternals()],
}
module.exports = [frontendBundle, backendBundle]
