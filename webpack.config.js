import webpack from 'webpack'
import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const developmentEnvironment = 'development'
const productionEnvironment = 'production'
const testEnvironment = 'test'

const getPlugins = function (env) {
  const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify(env),
    __DEV__: env === developmentEnvironment,
  }

  const plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
  ]

  switch (env) {
    case productionEnvironment:
      plugins.push(new ExtractTextPlugin('styles.css'))
      plugins.push(new webpack.optimize.DedupePlugin())
      plugins.push(new webpack.optimize.UglifyJsPlugin())
      break

    case developmentEnvironment:
      plugins.push(new webpack.HotModuleReplacementPlugin())
      plugins.push(new webpack.NoErrorsPlugin())
      break
  }

  return plugins
}

const getEntry = function (env) {
  const entry = []

  if (env === developmentEnvironment ) {
    entry.push('webpack-hot-middleware/client')
  }

  entry.push('./src/index')

  return entry
}

const getLoaders = function (env) {
  const loaders = [
    { test: /\.js$/,
      include: path.join(__dirname, 'src'),
      loaders: ['babel', 'eslint',], },
    { test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: ['file',],
    },
  ]

  if (env === productionEnvironment ) {
    loaders.push(
      {
        test: /(\.css|\.scss)$/,
        loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap'),
      }
    )
  } else {
    loaders.push(
      {
        test: /(\.css|\.scss)$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap',],
      }
    )
  }

  return loaders
}

function getConfig(env) {
  return {
    debug: true,
    devtool: env === productionEnvironment  ? 'source-map' : 'cheap-module-eval-source-map',
    noInfo: true,
    entry: getEntry(env),
    target: env === testEnvironment ? 'node' : 'web',
    output: {
      path: __dirname + '/dist',
      publicPath: '',
      filename: 'bundle.js',
    },
    plugins: getPlugins(env),
    module: {
      loaders: getLoaders(env),
    },
  }
}

export default getConfig
