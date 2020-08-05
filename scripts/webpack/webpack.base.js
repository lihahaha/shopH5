const path = require('path');
const webpack = require('webpack');
const os = require('os');
const HappyPack = require('happypack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const cpus = os.cpus;
const ThreadPool = HappyPack.ThreadPool;
const happyThreadPool = ThreadPool({ size: cpus().length - 1 });

const { resolveCwd, resolveDir, getPublishServer,
    isDev, getLocalServer, getDefined, contentHash, chunkHash } = require('../utils');
console.log(chunkHash)
const baseConfig = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: `js/[name]${chunkHash}.js`,
        chunkFilename: `js/[name]${chunkHash}.js`,
        path: resolveCwd('./dist'),
        // publicPath: isDev ? getLocalServer() : getPublishServer()
        publicPath: '/'
    },
    module: {
        noParse: function(content) {
            return /jquery|lodash/.test(content);  // 大型lib忽略
        },
        rules: [
            {
                test: /(\.js|\.jsx|\.ts)$/,
                exclude: /node_modules/,
                use: ['happypack/loader?id=happyBabel']
            },
            {
                test: /\.css|\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'happypack/loader?id=happyCSS'
                ]
            },
            {
                test: /\.json$/,
                use: ['happypack/loader?id=happyJSON']
            },
            {
                test: /\.(png|gif|jpg|jpeg|webp)$/,
                use: [
                    {
                        loader: 'url-loader', // happypack对url-loader支持不是很好，建议不适用 
                        options: {
                            limit: 8192,
                            name: path.normalize('assets/images/[name]_[contentHash:8].[ext]'),
                            publicPath: isDev ? getLocalServer() : getPublishServer()
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: path.normalize('assets/fonts/[name]_[contentHash:8].[ext]'),
                            publicPath: isDev ? getLocalServer() : getPublishServer()
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 删除output中文件
        new CleanWebpackPlugin(),
        // 强制所有模块的完整路径必需与磁盘上实际路径的确切大小写相匹配,linux max windows
        new CaseSensitivePathsPlugin(),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         { from: 'Aliplayer', to: 'Aliplayer' }
        //     ],
        // }),
        // 多线程
        new HappyPack({
            id: 'happyBabel',
            loaders: [{
                loader: 'babel-loader?cacheDirectory=true'
            }],
            threadPool: happyThreadPool,
            verbose: true
        }),
        new HappyPack({
            id: 'happyCSS',
            threadPool: happyThreadPool,
            loaders: [
                {
                    loader: require.resolve('css-loader'),
                    // options: { minimize: !isDev }
                },
                require.resolve('postcss-loader'),
                require.resolve('less-loader')
            ]
        }),
        //根据模块的相对路径生成 hash 作为模块 id
        new webpack.HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 5
        }),
        // 创建在编译时可以配置的全局常量
        new webpack.DefinePlugin(getDefined()),
        //识别某些类型的 webpack 错误并整理，以提供开发人员更好的体验
        new FriendlyErrorsWebpackPlugin(),
    ],
    resolve: {
        // 配置文件扩展名，require时可以省略扩展名
        extensions: ['.js', '.jsx'],
        // 别名设置 有错误，需要检查正确写法
        alias: {
            '@utils': resolveDir('src/utils'),
        }
    },
    node: {

    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'shop_commons',
                    chunks: 'initial',
                    minChunks: 4,
                    minSize: 0
                },
                // commons: {
                //     name: 'shop_commons',
                //     chunks: 'initial',
                //     minChunks: 4,
                //     minSize: 0
                // }
            }
        }
    }
}

module.exports = baseConfig;

