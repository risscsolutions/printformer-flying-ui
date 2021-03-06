const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled MiniCssExtractPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/mini-css-extract-plugin
 *
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');


/*
 * We've enabled TerserPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/terser-webpack-plugin
 *
 */

const TerserPlugin = require('terser-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
    return {
        mode: env.production ? 'production' : 'development',
        entry: './src/index.tsx',
        plugins: [
            new Dotenv(),
            new webpack.ProgressPlugin(),
            new MiniCssExtractPlugin({filename: 'main.[chunkhash].css'}),
            new HtmlWebpackPlugin({
                title: 'Printformer Flying UI',
                // Load a custom template (lodash by default)
                template: 'src/index.html'
            }),
            new webpack.EnvironmentPlugin({
                NODE_ENV: env.production ? 'production' : 'development',
            })
        ],
        module: {
            rules: [{
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                include: [path.resolve(__dirname, 'src')],
                exclude: [/node_modules/]
            }, {
                test: /.(scss|css)$/,

                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: "style-loader"
                }, {
                    loader: "css-loader",

                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader",

                    options: {
                        sourceMap: true
                    }
                }]
            }]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            fallback: {
                "fs": false,
                "tls": false,
                "net": false,
                "path": false,
                "zlib": false,
                "http": false,
                "https": false,
                "stream": false,
                "crypto": false,
                "crypto-browserify": require.resolve('crypto-browserify')
            }
        },
        optimization: {
            minimizer: [new TerserPlugin()],
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        priority: -10,
                        test: /[\\/]node_modules[\\/]/
                    }
                },
                chunks: 'async',
                minChunks: 1,
                minSize: 30000,
                name: false
            }
        }
    }
}
