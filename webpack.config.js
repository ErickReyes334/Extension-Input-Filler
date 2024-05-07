"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const webpack = __importStar(require("webpack"));
const autoprefixer = require("autoprefixer");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const cssnano = require("cssnano");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackConfig = {
    cache: false,
    entry: {
        "service_worker": [
            path.join(__dirname, "src/background/regeneratorRuntime.js"),
            path.join(__dirname, "src/service_worker/index.ts")
        ],
        "build/content-script": path.join(__dirname, "src/content_script/index.ts"),
        "build/options": path.join(__dirname, "src/options/index.tsx"),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(scss)$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: () => [autoprefixer(), cssnano()],
                            },
                        },
                    },
                    { loader: "sass-loader" },
                ],
            },
            {
                loader: "file-loader",
                exclude: [/\.(html?)$/, /\.(ts|tsx|js|jsx)$/, /\.css$/, /\.scss$/, /\.json$/],
                query: {
                    name: "[hash].[ext]",
                    outputPath: "media/",
                    publicPath: "build/",
                },
            },
        ],
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "dist"),
    },
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    context: "public",
                    from: "**/*",
                    to: path.join(__dirname, "dist/"),
                },
            ],
        }),
    ],
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
            src: path.resolve(__dirname, "src"),
        },
    },
    stats: "minimal",
};
exports.default = webpackConfig;
