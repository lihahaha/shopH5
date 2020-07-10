const path = require('path');
const webpack = require("webpack");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const HappyPack = require('happypack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
    mode: 'production',
    output: {
        // TODO
        filename: '[name]_[hash:8].js',
        chunkFilename: '[name]_[hash:8].js',
        path: path.resolve(__dirname, './dist')
    },
    entry: {
        project101: './src/index.js',
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        // TODO
        rules: [
            // {
            //     test: /(\.js|\.jsx|\.ts)$/,
            //     enforce: 'pre',
            //     loader: 'eslint-loader',
            //     include: [
            //         path.resolve(__dirname, 'project101'),
            //         path.resolve(__dirname, 'project102')
            //     ],
            // },
            {
                test: /(\.js|\.jsx|\.ts)$/,
                use: ['happypack/loader?id=happyBabel']
            },
            {
                test: '/.css$/',
                use: ['happypack/loader?id=css']
            }
        ]
    },
    plugins: [
        // TODO
        // new webpack.DllReferencePlugin({
        //     manifest: require('./dist/manifest.json')
        // }),
        // // new CleanWebpackPlugin(['dist']),
        // new HtmlWebpackPlugin({
        //     template: path.join(__dirname, './public/index.html'),
        //     filename: 'index.html'
        // }),
        // new webpack.HotModuleReplacementPlugin(),
        // new HtmlWebpackIncludeAssetsPlugin({
        //     assets: ['dist/vendor_fff581a.js'],
        //     files: ['index.html'],
        //     append: false
        // }),
        // new ParallelUglifyPlugin({
        //     cacheDir: '.cache/',
        //     uglifyJS: {
        //         output: {
        //             comments: false
        //         },
        //         warnings: false
        //     }
        // }),
        new HappyPack({
            id: 'happyBabel',
            loaders: [{
                loader: 'babel-loader?cacheDirectory=true'
            }],
            threadPool: happyThreadPool,
            verbose: true
        }),
        new HappyPack({
            id: 'css',
            loaders: ['style-loader', 'css-loader']
        })
        // new BundleAnalyzerPlugin()
    ],
    devtool: false,
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                common1: {
                    name: 'common1',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2
                },
                common2: {
                    name: 'common2',
                    test: /@shark/,
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 1
                }
            }
        },
        namedChunks: true,
        namedModules: true
    },
    devServer: {
        host: 'localhost',
        port: 3000,
        open: true,
        hot: true
    }
};
