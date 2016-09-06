/**
 * Webpack base config
 *
 * @Author: 刘谦 <qianliu>
 * @Date:   2016-09-06 11:42
 * @Email:  112486391@qq.com
 */

// Core
const path = require('path')

// Webpack
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// Sperate the 3rd libs
// https://fakefish.github.io/react-webpack-cookbook/Split-app-and-vendors.html
const alias = {
  // React
  'react': path.resolve(__dirname, './node_modules/react/dist/react.min.js'),
  'react-dom': path.resolve(__dirname, './node_modules/react-dom/dist/react-dom.min.js'),

  // Redux
  'redux': path.resolve(__dirname, './node_modules/redux/dist/redux.min.js'),
  'react-redux': path.resolve(__dirname, './node_modules/react-redux/dist/react-redux.min.js'),
}

// Need webpack parse
const needParse = ['react-dom', 'react-redux']

module.exports = {
  resolve: {
    alias,
    extensions: ['', '.js'],
  },
  entry: {
    vendors: Object.keys(alias),
  },
  module: {
    // Alias disables parsing by webpack except `react-dom`, `react-redux`
    noParse: Object.keys(alias).filter(k => needParse.indexOf(k) < 0).map(k => alias[k]),
    loaders: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
      // For antd *.css
      {
        test: /\.css$/i,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url?limit=10000&name=img/[hash:8].[name].[ext]',
          'img',
        ],
      },
    ],
  },
}
