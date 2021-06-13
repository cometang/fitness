
/**webpack 打包配置文件
 * author:cometang 2021-06-12
 */
//导入 nodejs 内直模块  获取项目根目录绝对路径
const path = require('path');
//导入 三方包/插件   html-webpack-plugin
//大驼峰命名
const HtmlWebpackPlugin = require('html-webpack-plugin')
//css提取并通过link方式引导页面的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
//每次打包-自动清除 dist 目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    //五大概念导出

    //入口
    entry: {
        //多页面应用 home模块
        home: './src/js/home.js',
        login: './src/js/login.js'
    },

    //出口
    output: {
        // 出口文件 放置的位置  必须是绝对路径
        // 出口文件的 文件名
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        //设置静态资源请求的 相对路径
        publicPath: './'
    },

    // loader 解释器
    module: {
        rules: [
            //使用什么loader  对什么格式的文件 进行解释
            //css-loader  让webpack 可以打包css代码
            //style-loader   将打包完成之后的css代码 添加页面的 head-style标签中
            {
                test: /\.css$/, use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                }, 'css-loader']
            },
            {
                test: /\.less$/, use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                }, 'css-loader', 'less-loader']
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                /** 详细配置*/
                options: {
                    //hash 随机32为字符  ext 获取文件后缀
                    name: '[hash:16].[ext]',
                    //小于20kb base64压缩  大于20kb 不进行压缩
                    limit: 20 * 1024,
                    esModule: false,   //图片打包设置为 Es规范进行打包 不使用commonjs规范
                    outputPath: 'img'
                }
            },
            { test: /\.html$/, loader: 'html-loader' },
            {
                test: /\.(svg|ttf|eot|woff|woff2)$/, loader: "file-loader",
                options: {
                    outputPath: 'fonts'   //输出的目录
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',    // loader 编译es6为es5
                exclude: /node_modules/  // 排除
            }
        ]
    },


    //plugins 插件
    plugins: [
        //home.html
        new HtmlWebpackPlugin({
            //以哪个页面作为打包的页面模板--打包哪个页面
            template: './src/page/home.html',
            filename: 'home.html',
            chunks: ['home']
        }),
        //login.html
        new HtmlWebpackPlugin({
            //以哪个页面作为打包的页面模板--打包哪个页面
            template: './src/page/login.html',
            filename: 'login.html',
            chunks: ['login']
        }),




        new MiniCssExtractPlugin({
            filename: 'css/[name].css' // 输出到css文件夹里
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new CleanWebpackPlugin()

    ],

    //mode 环境
    //development 本地开发环境
    // production 线上生成环境
    mode: "development",



    //开发服务配置
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // 启动服务器目录
        compress: true, // 启动gzip
        port: 8081,  // 端口  8080 80  8081 8082
        open: true, // 自动打开服务
        publicPath: '/', // 静态资源查找路径
        openPage: 'index.html', // 打开的页面
    },
    target: 'web', // 目标是浏览器


}