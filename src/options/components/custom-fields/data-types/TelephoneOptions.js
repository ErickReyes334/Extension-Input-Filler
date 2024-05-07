"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const helpers_1 = require("src/common/helpers");
const TextField_1 = __importDefault(require("src/options/components/common/TextField"));
const TelephoneOptions = () => {
    return (<TextField_1.default name="telephoneTemplate" label={(0, helpers_1.GetMessage)("customFields_label_template")} helpText={(0, helpers_1.GetMessage)("customFields_label_telephoneTemplate_helpText")}/>);
};
exports.default = TelephoneOptions;
