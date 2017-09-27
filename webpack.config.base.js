/**
 * Webpack base config
 *
 * @Author: 刘谦 <qianliu>
 * @Date:   2016-09-06 11:42
 * @Email:  112486391@qq.com
 */

require('dotenv').config()
const { NODE_ENV } = process.env
const isDev = NODE_ENV === 'development'

// Core
const path = require('path')

// Webpack
const webpack = require('webpack')

// Sperate the 3rd libs
// https://fakefish.github.io/react-webpack-cookbook/Split-app-and-vendors.html
const alias = {
  // React
  'react': path.resolve(__dirname, `./node_modules/react/dist/${isDev ? 'react.js' : 'react.min.js'}`),
  'react-dom': path.resolve(__dirname, `./node_modules/react-dom/dist/${isDev ? 'react-dom.js' : 'react-dom.min.js'}`),

  // Redux
  'redux': path.resolve(__dirname, `./node_modules/redux/dist/${isDev ? 'redux.js' : 'redux.min.js'}`),
  'react-redux': path.resolve(
    __dirname, `./node_modules/react-redux/dist/${isDev ? 'react-redux.js' : 'react-redux.min.js'}`
  )
}

// Need webpack parse
const needParse = ['react-dom', 'react-redux']

module.exports = {
  context: __dirname,
  resolve: {
    alias,
    extensions: [
      '.web.ts', '.web.tsx', '.web.js', '.web.jsx',
      '.ts', '.tsx',
      '.js', '.jsx',
      '.json'
    ],
    modules: [
      // 减少构建搜索或编译路径，可以获得显著的性能提升
      path.resolve(__dirname, './src/'),
      'node_modules'
    ]
  },
  module: {
    // 不需要经过 Webpack 处理的模块
    // https://webpack.js.org/configuration/module/#module-noparse
    noParse: Object.keys(alias).filter(k => needParse.indexOf(k) < 0).map(k => alias[k]),
    rules: [
      // 编译 ES6
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        // babel-loader 可以缓存处理过的模块，对于没有修改过的文件不会再重新编译，
        // cacheDirectory 有着2倍以上的速度提升，这对于 rebuild 有着非常大的性能提升
        use: 'babel-loader?cacheDirectory'
      },
      // 处理字体
      // 假设公共组件暂时不需要指定字体，以后需要时再补 conf
      {
        test: /\.(ttf|eot|woff2?)(\?v=[0-9]\.[0.9]\.[0-9])?$/,
        exclude: /node_modules/,
        use: 'file-loader?name=[name]-[hash:8].[ext]'
      },
      // 处理图片
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        include: path.resolve(__dirname, '../components/'),
        use: 'file-loader?name=[name]-[hash:8].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG)
    }),
    new webpack.NamedModulesPlugin()
  ]
}
