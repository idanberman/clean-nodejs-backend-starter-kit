const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const NodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [NodeExternals()], // in order to ignore all modules in node_modules folder

  entry: './src/main.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
