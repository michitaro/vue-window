const { VueLoaderPlugin } = require('vue-loader')

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
            { test: /\.scss/, use: ["style-loader", "css-loader", "sass-loader",] },
            { test: /\.ts$/, loader: 'ts-loader', options: { appendTsSuffixTo: [/\.vue$/] } }
        ],
    },
    externals: {
        vue: 'Vue'
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
}