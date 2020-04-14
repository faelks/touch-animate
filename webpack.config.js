const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    library: "TouchAnimation",
    libraryTarget: "umd",
    umdNamedDefine: true,
    filename: "index.js",
    globalObject: "this",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }],
  },
};
