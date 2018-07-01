const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  entry: path.resolve(__dirname, "../", "resources/theme.js"),
  output: {
    filename: "theme.js",
    path: path.resolve(__dirname, "../", "assets/"),
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "../", "assets/"),
    watchContentBase: true,
    compress: true,
    port: 9000,
    open: true,
    clientLogLevel: 'warning'
  },
  plugins: [
    new CleanWebpackPlugin(
    	['assets'],
    	{
			root:     path.resolve(__dirname, "../"),
			verbose:  true
		}
	),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'resources/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'page-example.html',
      template: 'resources/page-example.html'
    }),
    new MiniCssExtractPlugin({
      filename: "./css/style.css"
    }) 
  ],
  module: {
  	rules: [
	  {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
            	name: '[name].[ext]',
            	outputPath: './images/'
            }
          }
        ]
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
	        {
	          loader: "file-loader",
	          options: {
	            name: "[name].[ext]",
	            outputPath: "./fonts/"
	          }
	        }
    	]
  	  },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            } 
          },
          { loader: "css-loader" },
          {
          	loader: "postcss-loader",
          	options: {
          		ident: "postcss",
          		plugins: (loader) => [
          			require('postcss-easing-gradients'),
          			require('autoprefixer')({
			            browsers: [
				            '> 1%',
				            'last 2 versions',
				            'IE 10',
				            'IE 11'
			            ],
			            cascade: false
          			})
          		]
          	}
          },
          { loader: "sass-loader" }
        ]
      }
  	]
  }
};

module.exports = config;