const path = require('path');
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isHot = path.basename(require.main.filename) === 'webpack-dev-server.js';

// Настройка модуля
module.exports = {

  // Точки входа
  entry: {
    app: [
      './src/index.js',
      './src/index.less'
    ]
  },

  // Путь для собранных файлов
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].js'
  },

  // Модули
  module: {
    rules: [{
      test: /\.(less|css)$/,
      use: [
        'css-hot-loader',
        MiniCssExtractPlugin.loader,
        'css-loader',
        {loader: 'postcss-loader',  options: {
          ident: 'postcss',
          plugins: (loader) => [
            // require('postcss-import')({ root: loader.resourcePath }),
            // require('postcss-cssnext')(),
            require('autoprefixer')(),
            require('cssnano')()
          ]
        }},
        {loader: 'less-loader', options: {
          paths: [
            path.resolve(__dirname, 'node_modules')
          ]}
        }
      ]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }
  ]
  },

  // Подключаем дополнения
  plugins: [

    // Шаблонирование html
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),

    // Компилируем из LESS в CSS 
    new MiniCssExtractPlugin({
      filename: isHot ? 'css/[name].css' : 'css/[name].css',
      chunkFilename: 'css/[id].css'
    })
  ],

  // Настройка веб сервера
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    watchContentBase: true,
    noInfo: true,
    compress: true,
    hot: true,
    port: 3000
  }
};