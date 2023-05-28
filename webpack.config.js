const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const path = require("path");
module.exports = {
  mode: "production",
  entry: "./index.js",
  output: {
    filename: "cli.js",
    path: path.resolve(__dirname, "lib"),
  },
  plugins: [new NodePolyfillPlugin()],
  externals: {
    fs: require("fs"),
    child_process: require("child_process"),
    inquirer: require("inquirer"),
  },
};
