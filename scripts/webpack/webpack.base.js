const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
    mode: 'development',
    entry: {
        main: './../../src/index.js'
    },
    output: {
        filename: '[name]_[chunkhash:8].js',
        chunkFilename: '[name]_[chunkhash:8].js',
        path: resolve('./dist')
    },
    module: {

    },
    plugins: {

    },
    devtool: false,
    optimization: {

    },
    devServer: {

    }
}

// webpack 构建优化
// 1.
// 2. pollify