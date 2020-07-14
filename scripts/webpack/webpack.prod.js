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

const prodConfig = merge(baseConfig, {
    mode: 'production',
    devtool: 'cheap-module-source-map',
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
            // chunks: ['runtime'],
            minity: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                chunksSortMode: 'dependency'
            }
        })
    ],
    // optimization: {
    //     minimizer: [new ParallelUglifyPlugin({
    //         uglifyES: {
    //             output: {
    //                 comments: false
    //             },
    //             compress: {
    //                 warnings: false
    //             }
    //         },
    //         cacheDir: resolveCwd('node_modules/.uglify'),
    //         sourceMap: true
    //     })]
    // }
});

// run webpack config
webpack(prodConfig, (err, stats) => {
    if (err) {
        throw err;
    }
    process.stdout.write(`${stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    })}\n`);

    if (process.env.server) {
        // 给dist资源启动server
        const express = require('express'); //eslint-disable-line
        const app = express();

        app.use(express.static('dist'));

        console.log('Use the url http://localhost:3000 to access production resource');

        app.listen(10000, serr => err && console.error(serr));
    }
});

console.time('Total Time');

process.on('exit', () => {
    console.timeEnd('Total Time');
});

module.exports = prodConfig;