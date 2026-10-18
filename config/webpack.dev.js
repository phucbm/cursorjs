const {merge} = require('webpack-merge');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const {paths, packageInfo, server, env} = require("./config");

/**
 * Sample variables: "cross-env ENTRY=dev PORT=8080"
 * PORT: open a server in this port
 * ENTRY: folder to start building the bundle
 */
const port = env.PORT || '8080';
const entryFolder = env.ENTRY || 'dev';
const entryPath = path.resolve(__dirname, `../${entryFolder}`);

module.exports = merge(server, {
    // Set the mode to development or production
    mode: 'development',

    // Where webpack looks to start building the bundle
    entry: [entryPath + '/script.js'],

    // Where webpack outputs the assets and bundles
    output: {
        path: paths.dist,
        filename: '[name].bundle.js',
        publicPath: '/',
        clean: true,
    },

    // Customize the webpack build process
    plugins: [
        // Copies files from target to destination folder
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.public,
                    to: 'assets',
                    globOptions: {
                        ignore: ['*.DS_Store'],
                    },
                    noErrorOnMissing: true,
                },
            ],
        }),

        // Generates an HTML file from a template
        // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
        new HtmlWebpackPlugin({
            inject: true,
            hash: true,
            title: packageInfo.prettyName,
            favicon: paths.public + '/images/favicon.png',
            template: entryPath + '/index.html', // template file
            filename: 'index.html', // output file
        }),
    ],

    // Spin up a server for quick development
    devServer: {
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
        port: port,
    },
});