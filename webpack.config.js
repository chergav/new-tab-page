const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: "production",
	entry: ['./src/script.js'],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: 'script.js'
	},
	module: {
		rules: [
			{
			  test: /\.m?js$/,
			  exclude: /node_modules/,
			  use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									targets: {
										chrome: '55',
									}
								}
							]
						],
						plugins: [
							[
								"@babel/plugin-proposal-class-properties",
							]
						]
					}
				}
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyPlugin({
			patterns: [
				{ from: './src/new_tab.html', to: './new_tab.html' },
				{ from: './src/assets', to: './assets' },
				{ from: './src/icons', to: './icons' },
				{ from: './src/_locales', to: './_locales' },
				{ from: './src/manifest.json', to: './manifest.json' },
			],
		}),
    ],
};
