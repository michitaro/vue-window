const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    entry: [
        "./src/index.ts",
        "file-loader?name=example.html!./src/example.html",
    ],
    output: {
        path: `${__dirname}/dist`,
        filename: 'vue-window-standalone.js',
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
    externals: {
        vue: 'Vue'
    },
    plugins: [
        new VueLoaderPlugin(),
		new MiniCssExtractPlugin(),
    ],
}
