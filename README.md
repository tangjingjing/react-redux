# webpack
[参考链接](http://www.jianshu.com/p/42e11515c10f)

[更多文章](http://blog.csdn.net/keliyxyz/article/details/51571386)

## 初始化文件·
	
	npm instal 
   
	npm start
	
	npm run build

## 参数：

### devtool：生成Source Maps（使调试更容易）
	source-map： 在一个单独的文件中产生一个完整且功能完全的文件，但是它会减慢打包文件的构建速度；

	cheap-module-source-map:在一个单独的文件中生成一个不带列映射的map，提高项目构建速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便；

	eval-source-map：使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。不过在开发阶段这是一个非常好的选项，但是在生产阶段一定不要用这个选项；

	cheap-module-eval-source-map：这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和eval-source-map选项具有相似的缺点；


### entry: 入口文件

### output: 出口文件
	path： __dirname + "pubilc"  //打包后的文件存放的地方
	filename: "bundle.js"	//打包后输出文件的文件名

### devserver：构建本地服务器
	contentBase：默认devserver会在根目录提供本地服务器，此参数可以为另外一个目录下的文件提供本地服务器
	port：默认监听端口，默认为8080
	inline：设置为true，当源文件改变时会自动刷新页面
	colors：设置为true，使终端输出的文件为彩色的
	historyApiFallback：一般应用于单页面开发。它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html

### loaders
	需要在webpack的配置文件里的module关键字下配置
	module：{
		test: /\.json$/  //一个匹配loaders所处理的文件的扩展名的正则表达式（必需）
		loader： loader的名字（必需）
		include/exclud:手动添加必须处理的文件（文件夹）或屏蔽（可选）
		query： 为loaders提供额外的设置选项（可选）
	}

### babel
	可以在配置文件里配置，也可以配置在单独的文件".babelrc"文件里，
	babel-core 核心模块

	babel-preset-es2015	解析es6+ babel-preset-react	编译JSX语法
		{
			"presets": ["react", "es2015"]
		}

	css-loader	可以以@import和url(...)的方法实现require()的功能
	style-loader		将解析后的css打包到页面中
		{
			test: '/\.css/',
			loader: 'style!css' 
		}

### css预处理器
	postcss-loader   一个CSS的处理平台-PostCSS，可以帮助CSS实现更多的功能
	autoprefixer	自动添加前缀
		postcss: [
    		require('autoprefixer')//调用autoprefixer插件
  		],

###	plugins（插件）


	> 模版html
		HtmlWebpackPlugin	依据简单的模版，生成html文件，它会自动引用打包后的js文件，并且每次编译会在文件名中插入一个不同的哈希值	


			var HtmlWebpackPlugin = require('html-webpack-plugin');
			 new HtmlWebpackPlugin({
     			 template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
    		})


	> 热加载
	  Hot Module Replacement	自动刷新实时预览修改后的效果（利用babel的react-transform-hrm插件）
		配置文件：	
			  plugins: [
				    new webpack.HotModuleReplacementPlugin()
				  ],
			  devServer: {
					hot: true
				}
		npm install --save-dev babel-plugin-react-transform react-transform-hmr
		.babelrc
			
			{
			  "env": {
			    "development": {
			    "plugins": [["react-transform", {
			       "transforms": [{
			         "transform": "react-transform-hmr",
			
			         "imports": ["react"],
			
			         "locals": ["module"]
			       }]
			     }]]
			    }
			  }
			}
	> 压缩js
		UglifyJsPlugin
			
			plugins:[
				new webpack.optimize.UglifyJsPlugin(),
			]
			    
	> 分离css和js文件
		ExtractTextPlugin	

			var ExtractTextPlugin = require('extract-text-webpack-plugin');
			plugins:[
				 new ExtractTextPlugin("style.css")
			]	
	
	> 缓存
	
		把hash值添加到打包的文件名中，添加特殊的字符串混合体：([name],[id] and [hash1])到输出文件名前

			output:{
				path: __dirname + './build'
				filename: "[name]-[hash].js"
			}
		

		