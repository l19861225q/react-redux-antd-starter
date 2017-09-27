/**
 * Webpack server
 *
 * @Author: 刘谦 <qianliu>
 * @Date:   2016-09-06 11:23
 * @Email:  112486391@qq.com
 */

require('dotenv').config()
const { NODE_ENV, HOST, PORT_DEV, PORT_PROD } = process.env

// Webpack
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

// Env
const env = NODE_ENV
const isDev = env === 'development'
const port = isDev ? PORT_DEV : PORT_PROD

const webpackConfig = isDev
  ? require('./webpack.config.dev.js')
  : require('./webpack.config.pro.js')

const serverOptions = {
  hot: true,
  inline: true,
  stats: {
    colors: true,
    // Hide chunks output
    chunks: false,
    // Hide modules output
    modules: false,
    // Print the error details when webpack got some error
    errorDetails: true
  }
}

const server = new WebpackDevServer(webpack(webpackConfig), serverOptions)

server.listen(port, HOST, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`==> 🌎  Listening on ${env} port ${port}`)
  }
})
