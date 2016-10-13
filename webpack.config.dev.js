const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry:[
    'webpack-hot-middleware/client',
    './client/index'
  ],
  target: 'web',
  output: {
    path: path.join(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  devServer: {
    colors: true,
    historyApiFallback: true,
    inline: true,
    hot: true,
    contentBase: './client'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './dist/index.html',
      inject: true
    })
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'client'), loaders: ['babel']},
      { test: /\.ts$/, loader: 'ts-loader' },
      {test: /(\.css)$/, loaders: ['style', 'css?modules'], incldue:/flexboxgrid/ },
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  }
};
