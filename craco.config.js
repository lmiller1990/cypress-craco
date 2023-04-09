const { whenDev } = require('@craco/craco');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  webpack: {
    plugins: [
      new NodePolyfillPlugin({
        excludeAliases: ['console'],
      }),
    ],
    configure: whenDev(() => ({
      devtool: 'eval-source-map',
    })),
  },
};
