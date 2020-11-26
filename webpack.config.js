const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const IS_DEV = process.env.NODE_ENV !== 'production'
const TS_CONFIG = path.resolve(__dirname, './tsconfig.json')
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const PORT = process.env.PORT || 3000

module.exports = {
  entry: {
    app: path.join(__dirname, 'src', 'index.tsx'),
  },
  target: 'web',
  mode: IS_DEV ? 'development' : 'production',
  context: path.resolve(__dirname),

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: IS_DEV ? '[name].js' : '[name].[hash:8].js',
    chunkFilename: IS_DEV ? '[name].chunk.js' : '[name].[hash:8].chunk.js',
    publicPath: IS_DEV ? '/' : './',
    pathinfo: false,
  },

  resolve: {
    plugins: [new TsconfigPathsPlugin({ configFile: TS_CONFIG })],
    extensions: ['.tsx', '.ts', '.js', '.scss'],
  },

  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [['@babel/env', { modules: false }], '@babel/typescript', '@babel/react'],
              plugins: [
                'react-require',
                '@babel/proposal-export-namespace-from',
                ['@babel/transform-runtime', { corejs: 3 }],
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.module\.s(a|c)ss$/,
        include: [path.resolve(__dirname, 'src')],
        loader: [
          IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: IS_DEV,
              importLoaders: 1,
              // This enables local scoped CSS based in CSS Modules spec
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]]',
                exportLocalsConvention: 'camelCase',
              },
              // generates a unique name for each class (e.g. app__app___2x3cr)
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: IS_DEV,
            },
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: IS_DEV,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 64000,
              name: 'images/[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg(\?.*)?$/,
        oneOf: [
          {
            resourceQuery: /^\?raw$/,
            use: [
              {
                loader: 'html-loader',
                options: {
                  minimize: true,
                },
              },
            ],
          },
          {
            loader: 'url-loader',
            options: {
              emitFile: true,
              limit: 8092,
              name: 'images/[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: {
      name: 'common',
    },

    minimize: !IS_DEV,
  },
  devServer: {
    host: 'localhost',
    port: PORT,
    disableHostCheck: true,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new ForkTsCheckerPlugin({
      eslint: {
        enabled: true,
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: IS_DEV ? '[name].css' : '[name].[hash].css',
      chunkFilename: IS_DEV ? '[id].css' : '[id].[hash].css',
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
}
