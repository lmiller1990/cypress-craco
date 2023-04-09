const WDS = require('@cypress/webpack-dev-server');
const { defineConfig } = require('cypress');
const { createWebpackDevConfig } = require('@craco/craco');

module.exports = defineConfig({
  pageLoadTimeout: 180000,
  numTestsKeptInMemory: 0,

  reporterOptions: {
    toConsole: true,
  },

  env: {
    API_GATEWAY_BASE: 'https://development.services.com',
    DEV_SERVER_PORT: 3000,
  },

  e2e: {
    experimentalRunAllSpecs: true,
    excludeSpecPattern: [
      '**/energy_simulation/**',
      '**/debug/**.js',
      '**/_common/**',
    ],
  },

  component: {
    devServer(devServerConfig) {
      process.env.NODE_ENV = 'development'
      const cracoConfigFile = require('./craco.config.js');
      const cracoConfig = createWebpackDevConfig({
        ...cracoConfigFile,
        webpack: {
          ...cracoConfigFile.webpack,
          devtool: 'eval-source-map',
        },
      });

      return WDS.default({
        ...devServerConfig,
        framework: 'react',
        webpackConfig: cracoConfig,
      });
    },
  },
});

