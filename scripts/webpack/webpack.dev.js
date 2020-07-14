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
            template: 'src/index.html',
            filename: 'index.html',
            inject: true,
            chunks: ['runtime'],
            minity: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                chunksSortMode: 'dependency'
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        port: 3000,
        contentBase: resolveCwd("dist"),
        index: 'index.html',
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