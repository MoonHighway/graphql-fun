var webpack = require("webpack")
var nodeExternals = require("webpack-node-externals")

module.exports = {
    target: "node",
    externals: [nodeExternals()],
    entry: "./src-api/index.js",
    output: {
        path: __dirname,
        filename: "index.js",
        sourceMapFilename: "index.map",
        library: "library",
        libraryTarget: "umd"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                    presets: ["env", "stage-0"]
                }
            },
            {
                test: /\.graphql$/,
                exclude: /(node_modules)/,
                loader: "webpack-graphql-loader"
            }
        ]
    },
    plugins: (process.env.NODE_ENV !== 'production') ? [] : [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            warnings: false,
            mangle: true
        })
    ]
}