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
            { test: /\.ts$/, loader: 'ts-loader', options: { appendTsSuffixTo: [/\.vue$/] } }
        ],
    },
}