const path = require('path')
const webpack = require('webpack')
const {VueLoaderPlugin} = require('vue-loader')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const utils = require('./util.js')
module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist/js'),
    filename: 'main.js',
    publicPath: 'http://127.0.0.1:8090/'
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
        // include: [path.resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          postcss: [
            require('autoprefixer')({
              browsers: ['last 6 versions']
            })
          ]
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve('src')]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        }
      }
    ]
  },
  // eslint: {
  //   configFile: '../.eslintrc'
  // },
  resolve: {
    modules: ['node_modules'],
    extensions: [
      '.js', '.json', '.vue', '.css'
    ],
    alias: {
      '$src': path.resolve(__dirname, '../src'),
      '$views': path.resolve(__dirname, '../src/views'),
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  devtool: '#cheap-module-eval-source-map',
  target: 'web',
  devServer: {
    publicPath: '/',
    host: '127.0.0.1',
    port: 8090,
    historyApiFallback: true,
    open: true
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      // filename: '../index.html', //?????????html????????????
      template: 'index.html', // ???????????????
      inject: true // ?????????js?????????????????????body?????????,?????????'head'??????????????????head?????????
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
}
