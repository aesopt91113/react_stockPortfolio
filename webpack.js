var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

var config = {
  devServer: {
    host: 'localhost',
    port: '8080',
    historyApiFallback: true,
    contentBase: './pulbic',
    hot: true
  },
  entry: './src/application.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      filename: 'index.html'
    })
  ]
};

module.exports = config;
