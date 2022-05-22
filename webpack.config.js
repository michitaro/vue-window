const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    entry: [
        './src/index.ts',
    ],
    output: {
        path: `${__dirname}/lib`,
        filename: 'index.js',
        libraryTarget: 'umd',
		library: 'VueWindow',
		umdNamedDefine: true,
		globalObject: 'typeof self !== \'undefined\' ? self : typeof window !== \'undefined\' ? window : this',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            { test: /\.vue$/, use: 'vue-loader', exclude: /node_modules/i, },
            { test: /\.scss/, use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader",] },
            {
                test: /\.ts$/,
				loader: 'ts-loader',
				exclude: /node_modules/i,
				options: {
                    appendTsSuffixTo: [/\.vue$/],
                    compilerOptions: {
                        declaration: true,
                        declarationDir: "./lib/types",
                    },
                    appendTsSuffixTo: [/\.vue$/]
                }
            }
        ],
    },
    /*externals: [
        // include only relative assets
        function ({ context, request }, callback) {
            if (!request.match(/(?:^|!)(?:\.|\.\.)?\//))
                return callback(null, `commonjs ${request}`)
            callback()
        }
    ],*/
    plugins: [
		new MiniCssExtractPlugin(),
        new VueLoaderPlugin(),
    ],
}
