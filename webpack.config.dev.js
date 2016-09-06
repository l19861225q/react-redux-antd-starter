/**
 * Webpack development config
 *
 * @Author: 刘谦 <qianliu>
 * @Date:   2016-09-06 11:37
 * @Email:  112486391@qq.com
 */

// Core
const path = require('path')

// Webpack
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// Libs
const assign = require('assign-deep')

// Base config
const baseConfig = require('./webpack.config.base.js')

// Server config
const serverConfig = require('./config.js')

// Env
const env = process.env.NODE_ENV

const config = assign({}, baseConfig, {
  devtool: '#eval',
  entry: {
    index: [
      'webpack/hot/dev-server',
      `webpack-dev-server/client?http://${serverConfig.host}:${serverConfig.port[env]}`,
      path.resolve(__dirname, 'src/index.js'),
    ],
  },
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: process.env.NODE_ENV === 'development',
      __PRO__: process.env.NODE_ENV === 'production',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.bundle.js',
    }),
    new ExtractTextPlugin('style.css'),
  ],
})

module.exports = config
