var nodeExternals = require("webpack-node-externals");
var path = require("path");
require("@babel/polyfill");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  target: "node",
  externals: [nodeExternals()],
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: path.join(__dirname, "build"),
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
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};
