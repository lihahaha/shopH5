// const path = require('path');
// const webpack = require('webpack');
// const merge = require('webpack-merge');
// const HtmlWebPackPlugin = require("html-webpack-plugin");
// const autoprefixer = require('autoprefixer');
// const common = require('./webpack.base');
// const PATHS = require('./PATHS');
// // const OpenBrowserPlugin = require('open-browser-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

// console.log('SERVER', process.env.SERVER)
// console.log('ENV_SERVER_IP_PORT', process.env.ENV_SERVER_IP_PORT)
// module.exports = env => {
//     const API = (env || {}).API || 'mock';

//     console.log('API %s', API);

//     const devServer = {
//         contentBase: path.resolve(PATHS.dist),
//         historyApiFallback: true,
//         // compress: true,
//         hot: true,
//         inline: true,
//         disableHostCheck: true,
//         // progress: true
//     };

//     if (API === 'dev') {
//         devServer.proxy = {
//         '/security': 'http://172.30.1.164:9607' // 预发地址
//         };
//     } /* else {
//         devServer.proxy = {
//         '/api': {
//             target: 'http://rap2api.taobao.org',
//             pathRewrite: {
//             '^/api' : '/app/mock/84445/api'
//             }
//             // changeOrigin: true,
//             // onProxyRes: function(proxyReq, req, res) {
//             //   console.log('--------------------------------');
//             //   console.log(proxyReq);
//             //   console.log(req);
//             //   // console.log(res);
//             //   console.log('--------------------------------');
//             // }
//         }
//         };
//     } */

//     return merge(common, {
//         entry: {
//         main: ['@babel/polyfill', path.resolve(PATHS.src, 'index.js')]
//         },
//         output: {
//         filename: '[name].js',
//         path: path.resolve(PATHS.dist),
//         publicPath: '/'
//         },
//         mode: 'development',
//         devtool: 'inline-source-map',
//         devServer: devServer,
//         module: {
//         rules: [
//             {
//             test: /\.css$/,
//             use: [
//                 {
//                 loader: "style-loader"
//                 },
//                 {
//                 loader: "css-loader"
//                 }
//             ]
//             },
//             {
//             test: /\.less$/,
//             exclude: path.resolve(PATHS.src, 'asset/stylesheet'),
//             use: [
//                 {
//                 loader: "style-loader"
//                 },
//                 {
//                 loader: "css-loader",
//                 options: {
//                     modules: true,
//                     importLoaders: 1,
//                     localIdentName: "[local]_[hash:base64:5]",
//                     sourceMap: true,
//                     minimize: true
//                 }
//                 },
//                 {
//                 loader: 'postcss-loader',
//                 options: {
//                     plugins: [autoprefixer('last 2 version')],
//                     sourceMap: true
//                 }
//                 },
//                 {
//                 loader: "less-loader",
//                 options: {
//                     javascriptEnabled: true
//                 }
//                 // options: {
//                 //   modifyVars: {
//                 //     'primary-color': '#1DA57A',
//                 //     'link-color': '#1DA57A',
//                 //     'border-radius-base': '2px',
//                 //     'ant-input': '#061B2B',
//                 //     // or
//                 //     'hack': `true; @import "your-less-file-path.less";`, // Override with less file
//                 //   },
//                 //   javascriptEnabled: true,
//                 // }
//                 }
//             ]
//             },
//             {
//             test: /\.less$/,
//             include: path.resolve(PATHS.src, 'asset/stylesheet'),
//             use: [
//                 {
//                 loader: "style-loader"
//                 },
//                 {
//                 loader: "css-loader",
//                 },
//                 {
//                 loader: "less-loader",
//                 options: {
//                     javascriptEnabled: true
//                 }
//                 }
//             ]
//             },
//         ]
//         },
//         plugins: [
//         new webpack.HotModuleReplacementPlugin(),
//         // new OpenBrowserPlugin({
//         //   url: 'http://localhost:8080',
//         //   browser: "Google Chrome",
//         // }),
//         new CopyWebpackPlugin({
//             patterns: [
//             { from: 'Aliplayer', to: 'Aliplayer' }
//             ],
//         }),
//         new webpack.DefinePlugin({  // 为项目注入环境变量
//             'process.env.API': JSON.stringify(API),
//             'process.env.branch': JSON.stringify(process.env.ENV_SERVER_IP_PORT),
//             'process.env.MID_STATIC_GIS_IP_PORT': JSON.stringify(process.env.ENV_MID_STATIC_GIS_IP_PORT),
//             'process.env.WEBSOCKET_URL_ROUTINE': JSON.stringify(process.env.ENV_WEBSOCKET_URL_ROUTINE),
//             'process.env.WEBSOCKET_URL_DEVICE': JSON.stringify(process.env.ENV_WEBSOCKET_URL_DEVICE),
//         }),
//         new HtmlWebPackPlugin({
//             template: path.resolve(PATHS.src, 'asset/template/index.html'),
//             filename: path.resolve(PATHS.dist, 'index.html'),
//             favicon: path.resolve(PATHS.src, 'asset/image/favicon.png')
//         })
//         ]
//     });
// };

const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackDevServer = require('webpack-dev-server');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackHotMiddleware = require('webpack-hot-middleware');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.base');
const { resolveCwd } = require('../utils');
const config = require('../config');
const branchArgs = process.argv[2];
const currentBranch = branchArgs ? branchArgs.split('=')[1] : 'develop';
process.env.CURRENT_BRANCH = currentBranch;
const localPublishPath = config.localPublishPath;

const devConfig = merge(baseConfig, {
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: `[name].min.css?[contenthash:8]`,
            chunkFilename: `[name].min.css?[contenthash:8]`,
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            title: 'MOJITO',
            template: 'src/index.html',
            filename: 'src/index.html',
            // favicon: resolveCwd('assets/image/favicon.png'),
            inject: true,
            chunks: ['runtime'],
            minity: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                chunksSortMode: 'dependency'
            }
        })
    ],
    devServer: {
        port: 3000,
        hot: true,
        open: 'Chrome',
        clientLogLevel: 'error',
        overlay: {
            errors: true,
        },
        quiet: true,
        disableHostCheck: true,
        proxy: {
            "/api": {
                target: "http://live.com",
                changeOrigin: true,
                pathRewrite: {
                    "^/api" : "/"
                }
            }
        },
        before: (app) => {
            app.all('*', (req, res, next) => {
                res.header('Access-Control-Allow-Origin', '*');
                next();
            });
        }
    }
});
module.exports = devConfig;