var webpack = require('webpack');
var path = require('path');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var PATHS = {
  build: path.resolve(__dirname, 'build'),
  bundle: path.resolve(__dirname, 'public/js'),
  src: path.resolve(__dirname, 'src'),
  api: path.resolve(__dirname, 'api')
};


var config = {
  entry: PATHS.src + "/react/api.js",
  output: {
    path: PATHS.api,
    filename: 'randomcolorstripes.server.min.js'
  },
  module: {
    loaders: [{
      loader:'babel-loader',
      include: PATHS.src,
      test: /\.jsx?$/,
      query:{
        plugins:['transform-runtime'],
        presets:['es2015','stage-0','react']
      }
    }]
  }
  // module: {
  //   loaders: [{
  //     test: /\.jsx?/,
  //     include: PATHS.src,
  //     exclude: /node_modules/,
  //     loader : 'babel-loader'
  //   }]
  // },
  plugins: [
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};

module.exports = config;
