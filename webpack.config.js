/**
 * Created by tjj on 2016/12/14.
 */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');  //自动生成html，
var ExtractTextPlugin = require('extract-text-webpack-plugin');  //分离css和js文件

module.exports = {
    devtool: 'eval-source-map',//配置source maps
    entry:  __dirname + "/app/main.js",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    devServer: {
        // contentBase: "./public",//本地服务器所加载的页面所在的目录
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        inline: true,//实时刷新
        port: '8080'   //默认监听的端口号
    },
    module: {
        loaders: [
            {
                // // include/exclude手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文（文件夹）（可选）
                //    query：为loaders提供额外的设置选项（可选）
                test: /\.json$/,//一个匹配loader所处理的文件的扩展名的正则表达式（必须）
                loader: 'json'  //loader的名字。必须
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'  //在webpack的module部分的loaders里进行配置即可
            },
            {
                test: /\.css/,
                loader: 'style!css?modules!postcss'
            },
            //解析.scss文件,对于用 import 或 require 引入的sass文件进行加载，以及<style lang="sass">...</style>声明的内部样式进行加载
            {
                test: /\.scss$/,
                loader:'style!css!sass'
                // loader: ExtractTextPlugin.extract("style", 'css!sass') //这里用了样式分离出来的插件，如果不想分离出来，可以直接这样写 loader:'style!css!sass'
            }
        ]
    },
    postcss: [
        require('autoprefixer')//调用autoprefixer插件
    ],
    resolve: {
        extensions: ['', '.js', '.css', '.json','.scss'],
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
    },
    plugins: [
        new webpack.BannerPlugin("Copyright Flying Unicorns inc."), //在这个数组中new一个就可以了，添加开发者信息
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(),//热加载插件
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("[name]-[hash].css")
    ]
};