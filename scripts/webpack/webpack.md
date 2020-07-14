### 问题思考
1. webpack-merge的合并原理是怎么样的？
2. HashedModuleIdsPlugin作用分析，为什么要用
3. CleanWebpackPlugin插件的作用
4. CaseSensitivePathsPlugin 插件的作用
5. HappyPack适用场景，优缺点
6. DefinePlugin插件的作用
7. FriendlyErrorsWebpackPlugin插件的实际使用效果
8. dev prod dll 该如何配置的问题，会用哪些插件哪些loader，压缩啥的
9. 使用 chainWebpack 获取到 webpack 中的某一插件后，如何修改其配置
10. optimization使用
11. _process.cwd() 与 __dirname的区别
12. fileloader和urlloader区别和使用场景
13. MiniCssExtractPlugin干嘛的
14. webpackdevserver
15. webpackHotMiddleware
16. cross-env
17. html-webpack-plugin
18. fs-extra
19. cross-env  NODE_ENV=development webpack-dev-server --trace-warnings --open --config scripts/webpack/webpack.dev.js 参数详细 --open --config
20. 打包时命令行显示信息处理
21. webpack配置时没写在根目录下，entry路径还是相对src写
22. HotModuleReplacementPlugin 原理
23. package中用webpack和node执行的区别
###  webpack 构建优化
1. 多线程压缩  happypack
2. pollify
3. 后缀列表配置尽可能短
4. 别名配置