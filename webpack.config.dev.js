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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Dotenv = __importStar(require("dotenv-webpack"));
const webpack = __importStar(require("webpack"));
const webpack_merge_1 = require("webpack-merge");
const webpack_config_1 = __importDefault(require("./webpack.config"));
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const developmentConfig = {
    mode: "development",
    devtool: "inline-source-map",
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new webpack.SourceMapDevToolPlugin({
            exclude: /^vendor.*.\.js$/,
            filename: "[file].map",
        }),
        new Dotenv(),
    ],
};
exports.default = (0, webpack_merge_1.merge)(webpack_config_1.default, developmentConfig);
