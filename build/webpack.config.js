const path = require('path')
const {VueLoaderPlugin} = require('vue-loader')

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
        // options: {
        //   postcss: [
        //     require('autoprefixer')({
        //       browsers: ['last 6 versions']
        //     })
        //   ]
        // }
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
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: [
      ".js", ".json", ".vue", ".css"
    ],
    alias: {
      src: path.resolve(__dirname, 'src')
    }
  },
  //sourcemap 开发代码与实际代码不一致时帮助我们debug到原始开发代码的技术
  devtool: 'cheap-module-source-map',
  target: 'web',
  plugins: [
    new VueLoaderPlugin()
  ]
}
