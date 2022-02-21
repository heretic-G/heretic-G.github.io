const { FirstPlugin } = require('./plugin/firstPlugin')


module.exports = {
  entry: {
    app: './src/webpack/index.js'
  },
  mode: 'development',
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
    ]
  },
  plugins: [new FirstPlugin()]
}
