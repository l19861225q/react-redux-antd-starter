/**
 * Webpack production config
 *
 * @Author: 刘谦 <qianliu>
 * @Date:   2016-09-06 15:01
 * @Email:  112486391@qq.com
 */

// Core
const path = require('path')

// Webpack
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const CleanPlugin = require('clean-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

// Base config
const baseConfig = require('./webpack.config.base.js')

const config = webpackMerge({}, baseConfig, {
  devtool: false,
  watch: false,
  entry: {
    index: [
      path.resolve(__dirname, 'src/index'),
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[chunkhash:8].min.js',
    chunkFilename: '[name]-chunk-[chunkhash:8].min.js',
    publicPath: '/',
  },
  module: {
    rules: [
      // 处理 s?css
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?minimize', 'postcss-loader', 'sass-loader'],
          // 替换 css 中的资源引用路径指向 /public/
          // publicPath: '../../'
        })
      },
    ]
  },
  plugins: [
    ...baseConfig.plugins,
    // 清除上次打包生成的文件，保证目录干净
    new CleanPlugin(path.resolve(__dirname, './dist'), {
      verbose: false, // Do not show logs to console
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors-[chunkhash:8].min.js',
    }),
    new ExtractTextPlugin('style-[contenthash:8].min.css'),
    new ImageminPlugin({
      disable: false,
      optipng: { optimizationLevel: 3 },
      gifsicle: { optimizationLevel: 1 },
      jpegtran: { progressive: false },
      svgo: {},
      pngquant: {
        quality: '95-100',
        speed: 4
      },
    }),
    new HtmlPlugin({
      filename: 'index.html',
      template: './index.hbs',
      minify: {
        collapseWhitespace: true
      }
    })
  ],
})

module.exports = config
