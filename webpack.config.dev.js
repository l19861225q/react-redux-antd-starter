/**
 * Webpack development config
 *
 * @Author: 刘谦 <qianliu>
 * @Date:   2016-09-06 11:37
 * @Email:  112486391@qq.com
 */

require('dotenv').config()
const { HOST, PORT_DEV } = process.env

// Core
const path = require('path')

// Webpack
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

// Libs
const webpackMerge = require('webpack-merge')

// Base config
const baseConfig = require('./webpack.config.base.js')

const config = webpackMerge({}, baseConfig, {
  devtool: 'eval',
  watch: true,
  entry: {
    index: [
      'webpack/hot/dev-server',
      `webpack-dev-server/client?http://${HOST}:${PORT_DEV}`,
      path.resolve(__dirname, 'src/index.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: '[name]-bundle.js',
    chunkFilename: '[name]-chunk-bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      // 处理 s?css
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap'],
          // 替换 css 中的资源引用路径指向 /public/
          // publicPath: '../../'
        })
      },
    ]
  },
  plugins: [
    ...baseConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.bundle.js',
    }),
    new ExtractTextPlugin('style.css'),
    new HtmlPlugin({
      filename: 'index.html',
      template: './index.hbs'
    })
  ]
})

module.exports = config
