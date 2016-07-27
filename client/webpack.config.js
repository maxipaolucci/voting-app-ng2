var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?includePaths[]=' + path.resolve(__dirname, './src')
];

module.exports = {
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:8080',
    './src/main'
  ],

  output: {
    path: __dirname + '/dist/res',
    publicPath: '/res/',
    filename: 'main.js'
  },

  devServer: {
    contentBase: './dist'
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ["es2015"],
        }
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name].css' )
  ],

  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],

  resolve: {
    extensions: ['', '.js', '.sass', '.scss'],
    root: [path.join(__dirname, './src')]
  },

  debug: true
};