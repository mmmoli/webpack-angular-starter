var path = require('path');
var webpack = require("webpack");
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    cache: true,

    context: path.join(__dirname, 'src'),
    entry: './main.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/',
        chunkFilename: "modules/[chunkhash].js"
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style!css!autoprefixer-loader?browsers=last 2 version',
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            loader: 'style!css!autoprefixer-loader?browsers=last 2 version!less',
            exclude: /node_modules/
        }, {
            test: /\.html$/,
            loader: 'html?attrs=img:src source:src',
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json',
            exclude: /node_modules/
        }, {
            test: /\.woff(2)?(-1enn7r)?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)?(-1enn7r)?(#iefix-1enn7r)?(-1enn7r#symphinity)$/,
            loader: "file-loader"
        },{
            test: /[\/]angular\.js$/,
            loader: "exports?angular"
        }],

        noParse: [
            path.join('node_modules', '/angular'),
            path.join('node_modules', '/angular-ui-router')
        ]
    },

    plugins: [
        new ngAnnotatePlugin({
            add: true
        }),

        new HtmlWebpackPlugin({
            inject: true,
            template: "src/index.html"
        }),

        //new webpack.optimize.UglifyJsPlugin({
        //    output: {
        //        comments: false
        //    }
        //}),

        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ),

        new webpack.DefinePlugin({
            __API_BASE_URL__: JSON.stringify(process.env.API_BASE_URL),
            __DEV__: JSON.parse(process.env.DEV || true)
        })
    ],

    //devtool: 'eval',

    devServer: {
        contentBase: "./src",
        host: "0.0.0.0"
    },

    externals: {
        //angular: 'angular'
    },

    resolve: {
        alias: {
            'css': path.join(__dirname, 'src/css')
        },
        root: [
            path.join(__dirname, "bower_components")
        ]

    }
};