const packageInfo = require('../package.json');

/**
 * Environment variables
 * scripts: cross-env NODE_ENV=development
 */
const env = process.env;


/**
 * Banner
 */
const bannerConfig = {
    banner: `
/**!
 * ${packageInfo.prettyName} v${packageInfo.version}
 * @author ${packageInfo.author.name}
 * @homepage ${packageInfo.homepage}
 * @license ${packageInfo.license} ${new Date().getFullYear()}
 */`,
    raw: true
};


/**
 * Paths
 */
const path = require('path');
const paths = {
    // Source files
    src: path.resolve(__dirname, '../src'),
    entry: path.resolve(__dirname, '../src/_index.js'),

    // Production build files
    dist: path.resolve(__dirname, '../dist'),

    // Build web
    build: path.resolve(__dirname, '../build'),

    // Static files that get copied to build folder
    public: path.resolve(__dirname, '../public'),
};


/**
 * Server
 */
const server = {
    // Determine how modules within the project are treated
    module: {
        rules: [
            // JavaScript: Use Babel to transpile JavaScript files
            {test: /\.js$/, use: ['babel-loader']},

            // Images: Copy image files to build folder
            {test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource'},

            // Fonts and SVGs: Inline files
            {test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline'},

            // HTML
            {test: /\.html$/i, loader: "html-loader",},

            // Styles: Inject CSS into the head with source maps
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {sourceMap: true, importLoaders: 1, modules: false},
                    },
                    {loader: 'postcss-loader', options: {sourceMap: true}},
                    {loader: 'sass-loader', options: {sourceMap: true}},
                ],
            },
        ],
    },

    resolve: {
        modules: [paths.src, 'node_modules'],
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': paths.src,
            assets: paths.public,
        },
    },

    // Control how source maps are generated
    devtool: 'inline-source-map',
};


/**
 * Export
 */
module.exports = {
    paths,
    packageInfo,
    bannerConfig,
    server,
    env
};