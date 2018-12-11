# react项目搭建的过程

仓库地址： [https://github.com/xieqingtian/react-build-tutorial](https://github.com/xieqingtian/react-build-tutorial)

- **step 0 安装项目所需依赖包**

首先安装一些基本的依赖包。	
> **devDependencies**

	babel-core   
	babel-loader 
	babel-preset-latest  
	babel-preset-react
	babel-preset-stage-0
	babel-plugin-transform-runtime
	babel-plugin-transform-decorators-legacy
	babel-runtime
	css-loader
	file-loader
	less-loader
	style-loader
	url-loader
	webpack
	webpack-dev-middleware
	webpack-hot-middleware
	less
	koa

> **dependencies**

    prop-types
    react
    react-dom

运行以下命令安装开发依赖

    npm i --save-dev babel-core babel-loader babel-preset-latest babel-preset-react babel-preset-stage-0 babel-plugin-transform-runtime babel-plugin-transform-decorators-legacy babel-runtime css-loader file-loader less-loader style-loader url-loader webpack webpack-dev-middleware webpack-hot-middleware less koa koa-router


- **step1 使用koa2启动http服务并显示页面**

首先按照以下目录结构新增一些目录以及文件，详细如下

    │  .babelrc  //babel配置文件
    │  package.json
    │  README.md
    │
    ├─server //存放服务端代码文件
    │  │  server.js  //开启http服务
    │  │
    │  └─middleware
    │  devMiddleware.js  //koa中间件，可以让webpack-dev-middleware配合koa使用
    │  hotMiddleware.js  
    │
    ├─src//存放前端业务代码文件
    │  │  index.js   //前端页面入口文件
    │  │
    │  ├─assets  //前端静态资源目录
    │  │  index.html 
    │  │
    │  └─components  //存放你的react组件
    │  App.js
    │  app.less
    │
    └─webpack   //存放webpack配置文件
    webpack.config.js

> **.babelrc**文件内容如下

	{
	    "presets": [
	        [
	            "latest",
	            {
	                "modules": false
	            }
	        ],
	        "stage-0",
	        "react"
	    ],
	    "plugins": [
	        "transform-runtime",
	        "transform-decorators-legacy"
	    ]
	}

> **server.js**文件内容如下

	const Koa = require('koa')
	const webpack = require('webpack')
	const webpackConfig = require('../webpack/webpack.config')
	//const hotMiddleware = require('./middleware/hotMiddleware')
	const devMiddleware = require('./middleware/devMiddleware')
	const path = require('path')
	const Router = require('koa-router')
	const fs = require('fs')
	
	const router = new Router()
	const app = new Koa()
	const compiler = webpack(webpackConfig)
	
	app.use(devMiddleware(compiler, {
	    noInfo: true,
	    watchOptions: {
	        aggregateTimeout: 300,
	        poll: false
	    },
	    publicPath: webpackConfig.output.publicPath,
	    stats: {
	        colors: true
	    }
	}))
	
	router.get('/favicon.ico', (ctx, next) => {
	    ctx.body = null
	})
	
	//渲染页面
	router.get('/', async (ctx, next) => {
	    const htmlFile = await new Promise((resolve, reject) => {
	        fs.readFile(path.join(__dirname,'../src/assets/index.html'), (err, data) => {
	            if (err) {
	                reject(err)
	            } else {
	                resolve(data.toString())
	            }
	        })
	    })
	    ctx.type = 'html'
	    ctx.body = htmlFile
	})
	
	app.use(router.routes()).use(router.allowedMethods())
	
	app.listen(3000)

> **devMiddleware.js**文件内容如下

	const devMiddleware = require('webpack-dev-middleware')
	
	module.exports = (compiler, opts) => {
	    const expressMiddleware = devMiddleware(compiler, opts)
	    return async (ctx, next) => {
	        await expressMiddleware(ctx.req, {
	            end: (content) => {
	                ctx.body = content
	            },
	            setHeader: (name, value) => {
	                ctx.set(name, value)
	            }
	        }, next)
	    }
	}

> **hotMiddleware.js**文件内容如下

	const hotMiddleware = require('webpack-hot-middleware')
	const { PassThrough } = require('stream')
	
	module.exports = (compiler, opts) => {
	    const expressMiddleware = hotMiddleware(compiler, opts)
	    return async (ctx, next) => {
	        let stream = new PassThrough()
	        ctx.body = stream
	        await expressMiddleware(ctx.req, {
	            write: stream.write.bind(stream),
	            writeHead: (status, headers) => {
	                ctx.status = status
	                ctx.set(headers)
	            }
	        }, next)
	    }
	}

> **webpack.config.js**文件内容如下

	const path = require('path')
	const webpack = require('webpack')
	
	module.exports = {
	    entry: [
	        path.join(__dirname, '../src/index.js')// 入口文件
	    ],
	    output: {
	        filename: 'bundle.js', // 打包后的文件名
	        chunkFilename: '[name].[chunkhash:5].js',
	        path: path.join(__dirname, '/'), // 打包后的文件存储位置
	        publicPath: '/'
	    },
	
	    resolve: {
	        modules: [path.join(__dirname, '../node_modules')], // 优化webpack文件搜索范围
	        extensions: ['.web.js', '.jsx', '.js', '.json']
	    },
	
	    devtool: 'cheap-module-eval-source-map', // 开启生成source-map文件功能便于代码调试
	
	    module: {
	        rules: [
	            {
	                test: /\.js$/,
	                use: ['babel-loader?cacheDirectory'], // 开启编译缓存
	                exclude: /node_modules/
	            },
	            {
	                test: /\.css$/,
	                use: [
	                    'style-loader',
	                    'css-loader?modules&localIdentName=[local]-[hash:base64:5]', // 编译css文件的loader并开启css-modules功能
	                ],
	                exclude: /node_modules/
	            },
	            {
	                test: /\.less$/,
	                exclude: /node_modules/,
	                use: [
	                    'style-loader',
	                    'css-loader?&modules&localIdentName=[local]-[hash:base64:5]', // 编译less文件的loader并开启css-modules功能
	                    'less-loader'
	                ],
	            },
	            {
	                test: /\.(jpe?g|png|gif|mp4|webm|otf|webp)$/,
	                use: ['url-loader?limit=10240']
	            },
	            {
	                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
	                use: 'url-loader?limit=10000'
	            },
	            {
	                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
	                use: 'file-loader'
	            }
	        ],
	    },
	    plugins: [
	        new webpack.NoEmitOnErrorsPlugin(),//报错时不退出webpack进程
	        new webpack.DefinePlugin({
	            'process.env.NODE_ENV': '"development"'//用于区分开发和生产环境
	        })
	    ],
	}

> **index.html**文件内容如下

	<!DOCTYPE html>
	<html lang="en" style="height: 100%;">
	
	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <meta http-equiv="X-UA-Compatible" content="ie=edge">
	    <title>react-demo</title>
	</head>
	
	<body>
	    <div id="root" style="height:100%"></div>
	    <script src="/bundle.js"></script>
	</body>
	
	</html>

> **index.js**文件内容如下

	import React from 'react'
	import ReactDOM from 'react-dom'
	import App from './components/App'
	
	ReactDOM.render(<App />, document.getElementById('root'))

> **App.js**文件内容如下

	import React, { Component } from 'react'
	import styles from './app.less'
	
	class App extends Component {
	    render() {
	        return (
	            <h1 className={styles.title}>hello react</h1>
	        )
	    }
	}
	
	export default App

> **app.less**文件内容如下

	.title{
	    color: red;
	}

> **package.json**还需要加上启动命令，如下

	"scripts": {
       	"start": "node ./server/server.js"
	}

> ### npm start 	运行 ###

- **step3 加入热加载功能 **

使用react的热加载我们必须先安装**react-hot-loader**，执行以下命令进行安装
	
	npm install --save react-hot-loader@next

修改一下server.js，.babelrc，webpack.config.js，index.js这几个文件

> **server.js**文件

	app.use(hotMiddleware(compiler, {
	    // log: console.log,
	    // path: '/__webpack_hmr',
	    // heartbeat: 10 * 1000
	}))

> **.babelrc**文件

	{
	    "presets": [
	        [
	            "latest",
	            {
	                "modules": false
	            }
	        ],
	        "stage-0",
	        "react"
	    ],
	    "env": {
	        "development": {
	            "plugins": [
	                "react-hot-loader/babel"
	            ]
	        }
	    },
	    "plugins": [
	        "transform-runtime",
	        "transform-decorators-legacy"
	    ]
	}

> **webpack.config.js**文件

	module.exports = {
	    entry: [
	        'react-hot-loader/patch', // 开启 React 代码的模块热替换(HMR)
	        'webpack-hot-middleware/client', // 当发生热更新时控制台会有提示
	        path.join(__dirname, '../src/index.js')// 入口文件
	    ],

		....

		plugins: [
	        new webpack.NoEmitOnErrorsPlugin(),//报错时不退出webpack进程
	        new webpack.HotModuleReplacementPlugin(),//代码热替换
	        new webpack.DefinePlugin({
	            'process.env.NODE_ENV': '"development"'//用于区分开发和生产环境
	        })
	    ],
	}

> **index.js**入口文件修改如下

	import React from 'react'
	import ReactDOM from 'react-dom'
	import { AppContainer } from 'react-hot-loader'
	// AppContainer 是一个 HMR 必须的包裹(wrapper)组件
	import App from './components/App'
	
	const render = (Component) => {
	    ReactDOM.render(
	        <AppContainer>
	            <Component />
	        </AppContainer>,
	        document.getElementById('root')
	    )
	}
	
	render(App)
	
	// 模块热替换的 API
	if (module.hot) {
	    module.hot.accept('./components/App.js', () => {
	        const NextApp = require('./components/App.js').default
	        render(NextApp)
	    })
	}


> 参考链接地址：[https://github.com/xieqingtian/react-build-tutorial](https://github.com/xieqingtian/react-build-tutorial)