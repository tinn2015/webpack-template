const path = require('path')
const webpack = require('webpack')
const {VueLoaderPlugin} = require('vue-loader')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist/js'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|ttf)(\?.*)?$/,
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
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
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
  // sourcemap ???????????????????????????????????????????????????debug??????????????????????????????
  devtool: false,
  target: 'web',
  plugins: [
    new CleanWebpackPlugin(['dist'], {root: path.resolve(__dirname, '../')}),
    new VueLoaderPlugin(),
    new UglifyJsPlugin({
      sourceMap: true,
      cache: true,
      parallel: true
    }),
    new ExtractTextPlugin({
      filename: '../css/[name].css',
      allChunks: true
    }),
    new OptimizeCSSPlugin(),
    new webpack.optimize.SplitChunksPlugin({
      chunks: 'all',
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html', // ?????????html????????????
      template: 'index.html', // ???????????????
      inject: true, // ?????????js?????????????????????body?????????,?????????'head'??????????????????head?????????
      minify: { // ????????????
        removeComments: true, // ??????html??????????????????
        collapseWhitespace: true, // ??????html???????????????
        removeAttributeQuotes: true // ??????html????????????????????????
      },
      chunksSortMode: 'dependency' // ???dependency???????????????
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
}
