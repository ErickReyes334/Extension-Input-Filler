"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const helpers_1 = require("src/common/helpers");
const AddFieldButton = (props) => {
    function handleClick() {
        props.onClick(props.index);
    }
    return (<div className="add-field-bar">
      <button type="button" className="btn btn-sm btn-outline-primary" disabled={props.disabled} onClick={handleClick}>
        {(0, helpers_1.GetMessage)("customFields_addFieldButtonText")}
      </button>
    </div>);
};
AddFieldButton.defaultProps = {
    disabled: false,
};
exports.default = AddFieldButton;
