"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const helpers_1 = require("src/common/helpers");
const TextAreaField_1 = __importDefault(require("src/options/components/common/TextAreaField"));
const RandomizedListOptions = () => {
    return (<TextAreaField_1.default name="list" label={(0, helpers_1.GetMessage)("customFields_label_listItems")} helpText={(0, helpers_1.GetMessage)("customFields_label_listItems_placeholder")}/>);
};
exports.default = RandomizedListOptions;
