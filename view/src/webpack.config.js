// webpack needs to be explicitly required
const webpack = require('webpack')
// import webpack from 'webpack' // (if you're using ESM)

module.exports = {

/* ... rest of the config here ... */

  plugins: [
    // fix "process is not defined" error:
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ],
  resolve: {
    fallback: {
      buffer: require.resolve('buffer'),
    },
  }
}
