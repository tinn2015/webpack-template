const path = require('path')

module.exports = {
  mode: 'production',
  entry: '../src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {

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

  ]
}