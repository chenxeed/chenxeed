const webpack = require('webpack')

module.exports = {
  lintOnSave: true,
  configureWebpack: {
    output: {
      jsonpFunction : 'chenxeedWebpackJsonp'
    }
  }
}