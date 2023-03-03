const path = require("path");
module.exports = {
  mode: 'production' || 'development',
  entry: {
    index: "./src/libs/machine-learning/index.ts"
  },
  devtool:  'source-map',
  output: {
    path: path.resolve(__dirname, "dist/ml/"), // 打包后的输出目录
    filename: "ml.js",
    libraryTarget: 'umd',
    library: 'ML'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      "@src": path.resolve(__dirname, 'src'),
    }
  }
}