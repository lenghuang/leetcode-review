'use strict';

const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const PATHS = require('./paths');

// Merge webpack configuration files
const config = (env, argv) =>
  merge(common, {
    entry: {
      popup: PATHS.src + '/popup.ts',
      contentScriptLc: PATHS.src + '/contentScriptLc.ts',
      contentScriptRc: PATHS.src + '/contentScriptRc.ts',
      background: PATHS.src + '/background.ts',
      config: PATHS.src + '/config.ts',
      chromeUtils: PATHS.src + '/chromeUtils.ts',
      enums: PATHS.src + '/enums.ts',
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
  });

module.exports = config;
