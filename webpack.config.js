const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { DEV, DEBUG } = process.env;

process.env.BABEL_ENV = DEV ? 'development' : 'production';
process.env.NODE_ENV = DEV ? 'development' : 'production';

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    clean: true,
  },
  devServer: {
    port: 8080,
    historyApiFallback: true,
    // 端口
    port: 9000,
    // 开启压缩
    compress: true,
    // 打开默认浏览器
    open: true,
    // 模块热更新
    hot: true,
    static: {
      directory: path.join(__dirname, './src/statics'),
      publicPath: '/public',
    },
    
  },
  performance:{
      hints: false
  },
  mode: DEV ? 'development' : 'production',
  devtool: DEV && 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime']
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // 处理 .less
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // less-loader
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                // 替换antd的变量，去掉 @ 符号即可
                // https://ant.design/docs/react/customize-theme-cn
                modifyVars: {
                  'primary-color': '#1DA57A',
                  'border-color-base': '#d9d9d9', // 边框色
                  'text-color': '#d9d9d9'
                },
                javascriptEnabled: true, // 支持js
              },
            },
          },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: !!DEV,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !!DEV,
            },
          },
        ],
      },
      {
        test: /\.png/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: false,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    minimize: !DEV,
    splitChunks: {
      minSize: 500000,
      cacheGroups: {
        vendors: false,
      },
    },
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.less', 'scss'],
    alias: {
        "@src": path.resolve(__dirname, 'src'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/public/index.html'),
      filename: 'index.html',
      inject: true,
      title: "WeDo"
    }),
    DEBUG && new BundleAnalyzerPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
          from: path.resolve(__dirname, './src/statics'),
          to: path.resolve(__dirname, './dist/public'),
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
    //new ESLintPlugin(),
    new ForkTsCheckerWebpackPlugin(),
  ].filter(Boolean),
};