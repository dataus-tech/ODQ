const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/main.js',
  },
  output: {
    filename: 'app.js',
    path: path.resolve('./dist'),
    clean: true,
  },
  devtool: 'inline-source-map',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  target: 'web',
  devServer: {
    compress: true,
    hot: true,
    static: [
      {
        directory: path.join(__dirname, 'public'),
      },
      {
        directory: path.join(__dirname, 'src'),
        publicPath: '/src',
      },
    ],
    port: 8080,
    // proxy: {
    //   "/api": "http://localhost:3000",
    // },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: { import: true },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|pages)/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      files: {
        js: [
          '/src/lib/slickgrid/lib/jquery-1.12.4.min.js',
          '/src/lib/slickgrid/lib/jquery-ui-1.11.3.min.js',
          '/src/lib/slickgrid/lib/jquery.event.drag-2.3.0.js',
          '/src/lib/slickgrid/lib/jquery.event.drop-2.3.0.js',
          '/src/lib/slickgrid/slick.core.js',
          '/src/lib/slickgrid/slick.dataview.js',
          '/src/lib/slickgrid/slick.editors.js',
          '/src/lib/slickgrid/plugins/slick.cellrangeselector.js',
          '/src/lib/slickgrid/plugins/slick.cellrangedecorator.js',
          '/src/lib/slickgrid/plugins/slick.cellselectionmodel.js',
          '/src/lib/slickgrid/plugins/slick.customtooltip.js',
          '/src/lib/slickgrid/slick.grid.js',
          '/src/lib/bootstrap-5.1.3-dist/js/bootstrap.min.js',
        ],
        css: [
          '/src/lib/bootstrap-5.1.3-dist/css/bootstrap.min.css',
          '/src/lib/jquery/jquery-ui-1.8.16.custom.css',
          '/src/lib/slickgrid/slick-default-theme.css',
          '/src/lib/slickgrid/slick.grid.css',
          '/src/lib/slickgrid/css/smoothness/jquery-ui.css',
        ],
      },
    }),
    new MiniCssExtractPlugin(),
  ],
  optimization: {},
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.css'],
    alias: {
      '@': path.join(__dirname, 'src/'),
    },
  },
};
