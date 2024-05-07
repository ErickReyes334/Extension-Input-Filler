"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const helpers_1 = require("src/common/helpers");
const ExternalLink_1 = __importDefault(require("src/options/components/common/ExternalLink"));
const Introduction = () => {
    return (<div>
      <p>
        {(0, helpers_1.GetMessage)("customFields_intro")}{" "}
        <ExternalLink_1.default url="https://github.com/FakeFiller/fake-filler-extension/wiki/Customization-using-Custom-Fields-and-Profiles">
          <b>{(0, helpers_1.GetMessage)("customFields_getMoreInfo")}</b>
        </ExternalLink_1.default>
      </p>
    </div>);
};
exports.default = Introduction;
