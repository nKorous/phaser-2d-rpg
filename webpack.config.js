const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        app: "./server.ts",
        vendors: ["phaser"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },

    mode: "development",

    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "index.html").replace(/\\/g, '/'),
                    to: path.resolve(__dirname, "dist").replace(/\\/g, '/')
                },
                {
                    from: path.resolve(__dirname, "assets", "**", "*").replace(/\\/g, '/'),
                    to: path.resolve(__dirname, "dist").replace(/\\/g, '/')
                }
            ]
        })
    ],

};