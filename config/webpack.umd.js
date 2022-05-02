const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: false,
    entry: "./src/js/cursor.js",
    output: {
        filename: 'gsap-cursor.umd.js',
        library: {
            type: 'umd',
            name: 'gsap-cursor',
        },
        // prevent error: `Uncaught ReferenceError: self is not define`
        globalObject: 'this',
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: "./src/js/cursor.js",
                    to: "./gsap-cursor.js"
                },
            ],
        }),
    ],
    optimization: {
        minimizer: [new TerserPlugin({extractComments: false})],
    },
};