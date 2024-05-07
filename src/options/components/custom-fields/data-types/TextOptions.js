"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const helpers_1 = require("src/common/helpers");
const TextField_1 = __importDefault(require("src/options/components/common/TextField"));
const TextOptions = () => {
    return (<>
      <TextField_1.default name="textMin" type="number" label={(0, helpers_1.GetMessage)("customFields_label_minWords")}/>
      <TextField_1.default name="textMax" type="number" label={(0, helpers_1.GetMessage)("customFields_label_maxWords")}/>
      <TextField_1.default name="textMaxLength" type="number" label={(0, helpers_1.GetMessage)("customFields_label_maxLength")}/>
    </>);
};
exports.default = TextOptions;
