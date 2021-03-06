import path from 'path'
import glob from 'glob'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import AssetsPlugin from 'assets-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import postcssImport from 'postcss-import'
import postcssCssnext from 'postcss-cssnext'

export default (config) => {
  const { isDevelopment } = config
  const configWebpack = {
    mode: 'none',
    context: config.paths.src,
    output: {
      filename: isDevelopment ? '[name].js' : '[name]-[chunkhash].js',
      path: config.assets.dst,
      publicPath: config.assets.publicPath
    },
    module: {
      rules: [{
        test: /\.js$/,
        use: 'babel-loader'
      }, {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                postcssImport(),
                postcssCssnext()
              ]
            }
          }
        ]
      }]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name]-[hash].css',
        chunkFilename: isDevelopment ? '[id].css' : '[id]-[hash].css'
      }),
      new AssetsPlugin({
        path: config.paths.dst,
        filename: config.assets.manifest,
        prettyPrint: true
      }),
      new webpack.optimize.ModuleConcatenationPlugin()
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            compress: false,
            ecma: 6,
            mangle: true
          },
          sourceMap: isDevelopment
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    }
  }

  configWebpack.entry = [
    ...glob.sync(config.assets.scripts),
    ...glob.sync(config.assets.styles)
  ].reduce((acc, filePath) => {
    const { name } = path.parse(filePath)
    acc[name] = filePath
    return acc
  }, {})

  config.webpack = configWebpack
  return config
}
