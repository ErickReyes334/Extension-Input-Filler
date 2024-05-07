"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const helpers_1 = require("src/common/helpers");
const TextField_1 = __importDefault(require("src/options/components/common/TextField"));
const NumberOptions = () => {
    return (<>
      <TextField_1.default name="numberMin" type="number" label={(0, helpers_1.GetMessage)("customFields_label_minValue")}/>
      <TextField_1.default name="numberMax" type="number" label={(0, helpers_1.GetMessage)("customFields_label_maxValue")}/>
      <TextField_1.default name="numberDecimalPlaces" type="number" min={0} max={10} label={(0, helpers_1.GetMessage)("customFields_label_decimalPlaces")} helpText={(0, helpers_1.GetMessage)("customFields_label_decimalPlaces_helpText")}/>
    </>);
};
exports.default = NumberOptions;
