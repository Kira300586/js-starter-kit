import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextplugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new ExtractTextplugin('[name].[contenthash].css'),
    new WebpackMd5Hash(),
    /* Use CommonChunkPlugin to create a separate bundle
       of vendor libraries so that they're cached separately. */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComment: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
      // Properties you're defining here will be available in index.html
      // using htmlWebpackPlugin.options.varName
      trackJSToken: '19d07834b1a74d6a96fbfecc3206d211'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextplugin.extract('css?sourceMap')}
    ]
  }
}
