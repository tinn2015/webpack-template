const path = require('path')
const webpack = require('webpack')
const {VueLoaderPlugin} = require('vue-loader')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

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
        loader: 'css-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            query: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            query: {
              limit: 10000
            }
          }
        ]
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
      // filename: '../index.html', //生成的html的文件名
      template: 'index.html', // 依据的模板
      inject: true // 注入的js文件将会被放在body标签中,当值为'head'时，将被放在head标签中
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
}
