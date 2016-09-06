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
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default

// Libs
const assign = require('assign-deep')
const cssnano = require('cssnano')

// Base config
const baseConfig = require('./webpack.config.base.js')

const config = assign({}, baseConfig, {
  devtool: false,
  entry: {
    index: [
      path.resolve(__dirname, 'src/index'),
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: process.env.NODE_ENV === 'development',
      __PRO__: process.env.NODE_ENV === 'production',
    }),
    // Use this for no-cache
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.min.js',
    }),
    new ExtractTextPlugin('style.min.css'),
    new OptimizeCssAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: { discardComments: { removeAll: true } },
      cssPrint: true,
    }),
    new ImageminPlugin({
      disable: false,
      optipng: { optimizationLevel: 3 },
      gifsicle: { optimizationLevel: 1 },
      jpegtran: { progressive: false },
      svgo: {},
      pngquant: {
        quality: '95-100',
        speed: 4,
      },
    }),
  ],
})

module.exports = config
