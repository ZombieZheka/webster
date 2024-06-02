const webpack = require('webpack');
const path = require('path');

module.exports = function override(config, env) {
  // Modify the entry point
  config.entry = [
    './src/js/main.js',
  ];

  // Modify the output configuration
  config.output = {
    ...config.output,
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  };

  // Modify the resolve configuration
  config.resolve = {
    ...config.resolve,
    extensions: ['.js', '.css'],
    alias: {
      Utilities: path.resolve(__dirname, './../node_modules/')
    }
  };

  // Modify the module rules
  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: { url: false }
        }
      ]
    },
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: ['babel-loader']
    },
  ];

  // Add plugins
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require("./package.json").version)
    }),
  ];

  // Modify the devtool configuration
  config.devtool = "cheap-module-source-map";

  // Modify the devServer configuration
  config.devServer = {
    ...config.devServer,
    static: {
      directory: path.resolve(__dirname, "./"),
    },
  };

  return config;
};
