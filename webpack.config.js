const path = require('path');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

// this is first time I set this up, so it might look messy

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  // i recall having problems with object window being undefined
  // target: 'es5',
  entry: path.resolve(__dirname, 'src/index.tsx'),
  devtool: isDevelopment ? 'inline-source-map' : false,
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.join(__dirname, 'src'),
        use: [
          isDevelopment && {
            loader: 'babel-loader',
            options: { plugins: ['react-refresh/babel'] },
          },
          {
            loader: 'ts-loader',
            // i can't remember why did i comment this, probably was experimenting
            // 'cus same settings didn't work for prod and dev
            // options: { transpileOnly: true },
          },
        ].filter(Boolean),
      },
    ],
  },
  plugins: [
    isDevelopment && new ReactRefreshPlugin(),
    // can't remember why did i comment this, I had issues when running
    // dev and production with same settings so i was commenting out parts
    // depending if i want production or dev setup (ik, wrong, but first time -eh)
    // new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './public/index.html',
    }),
  ].filter(Boolean),
};