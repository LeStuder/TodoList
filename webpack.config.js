const path = require("path");

module.exports = {
    entry: "./src/js/index.js",
    devtool: "inline-source-map",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist/js"),
        clean: true,
    },
};
