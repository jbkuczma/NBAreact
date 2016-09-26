var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/public'); //build file output
var APP_DIR = path.resolve(__dirname, 'src/app'); //app codebase

var config = {
  entry: [
      APP_DIR + '/jsx/app.jsx'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loaders : ['babel']
      }
    ]
  }
};

module.exports = config;
