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
  // sourcemap 开发代码与实际代码不一致时帮助我们debug到原始开发代码的技术
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
      filename: '../index.html', // 生成的html的文件名
      template: 'index.html', // 依据的模板
      inject: true, // 注入的js文件将会被放在body标签中,当值为'head'时，将被放在head标签中
      minify: { // 压缩配置
        removeComments: true, // 删除html中的注释代码
        collapseWhitespace: true, // 删除html中的空白符
        removeAttributeQuotes: true // 删除html元素中属性的引号
      },
      chunksSortMode: 'dependency' // 按dependency的顺序引入
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
}
