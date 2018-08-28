const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./cfg/webpack.config.js');
const path = require('path');

module.exports = () => {
  const options = {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    host: 'localhost',
    hot: true,
    quiet: true,
    historyApiFallback: true
  };
  
  webpackDevServer.addDevServerEntrypoints(config, options);
  const compiler = webpack(config);
  const server = new webpackDevServer(compiler, options);
  
  server.listen(3000, 'localhost', () => {
    console.log('dev server listening on port 3000');
  });
}

  


