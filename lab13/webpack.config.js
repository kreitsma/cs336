var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack');

module.exports = {
    entry: [
        __dirname + '/app/scripts/index.js'
    ],
    output: {
        path: __dirname + '/dist',
        filename: '/bundle.js'
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.css$/,  loader: 'style!css?modules!postcss' }
        ]
    },
		plugins: [
				new HtmlWebpackPlugin({template: __dirname + "/app/index.tmpl.html"}),
				new webpack.HotModuleReplacementPlugin()
    ],
		 devServer: {
        port: 3001,
        proxy: { '/api/*': 'http://localhost:3000' },
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true

				//Web dev server reads from memory--on port 3001, if you change a file while server is running, it will be reflected, but port 3000 stays the same.
				//Running /api/comments just loads the json formatted comments.
    }
};
