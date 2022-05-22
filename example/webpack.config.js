const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    entry: [
        "./src/main.ts",
        "file-loader?name=index.html!./src/index.html",
    ],
    output: {
        path: `${__dirname}/dist`,
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.scss/, use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader",] },
            { test: /\.ts$/, loader: 'ts-loader', options: { appendTsSuffixTo: [/\.vue$/] } }
        ],
    },
    plugins: [
		new MiniCssExtractPlugin(),
        new VueLoaderPlugin(),
    ],
}
