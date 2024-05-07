"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const helpers_1 = require("src/common/helpers");
const TextField_1 = __importDefault(require("src/options/components/common/TextField"));
const AlphanumericOptions = () => {
    const alphanumericTypeHelpText = (<div>
      <div className="row">
        <div className="col-sm-6">
          <code>L</code> {(0, helpers_1.GetMessage)("customFields_alNumHelp_uppercaseLetter")}
          <br />
          <code>l</code> {(0, helpers_1.GetMessage)("customFields_alNumHelp_lowercaseLetter")}
          <br />
          <code>D</code> {(0, helpers_1.GetMessage)("customFields_alNumHelp_upperAndLowercaseLetter")}
          <br />
          <code>C</code> {(0, helpers_1.GetMessage)("customFields_alNumHelp_uppercaseConsonant")}
          <br />
          <code>c</code> {(0, helpers_1.GetMessage)("customFields_alNumHelp_lowercaseConsonant")}
          <br />
          <code>E</code> {(0, helpers_1.GetMessage)("customFields_alNumHelp_upperAndLowercaseConsonant")}
        </div>
        <div className="col-sm-6">
          <code>V</code> {(0, helpers_1.GetMessage)("customFields_alNumHelp_uppercaseVowel")}
          <br />
          <code>v</code> {(0, helpers_1.GetMessage)("customFields_alNumHelp_lowercaseVowel")}
          <br />
          <code>F</code> {(0, helpers_1.GetMessage)("customFields_alNumHelp_upperAndLowercaseVowel")}
          <br />
          <code>x</code> {(0, helpers_1.GetMessage)("customFields_alNumHelp_number09")}
          <br />
          <code>X</code> {(0, helpers_1.GetMessage)("customFields_alNumHelp_number19")}
        </div>
      </div>
      <br />
      <p>{(0, helpers_1.GetMessage)("customFields_alNumHelp_otherCharactersAsIs")}</p>
    </div>);
    return (<TextField_1.default name="alphanumericTemplate" label={(0, helpers_1.GetMessage)("customFields_label_format")} helpText={alphanumericTypeHelpText}/>);
};
exports.default = AlphanumericOptions;
