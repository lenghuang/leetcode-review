'use strict';

const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const PATHS = require('./paths');
const Dotenv = require('dotenv-webpack');

// Merge webpack configuration files
const config = (env, argv) =>
  merge(common, {
    entry: {
      // If you want background or ContentScripts, add more entries
      popup: PATHS.src + '/popup.js',
      background: PATHS.src + '/background.js',
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
    plugins: [
      new Dotenv({
        path: argv.mode === 'production' ? './.env.production' : './.env.local',
      }),
    ],
  });

module.exports = config;
