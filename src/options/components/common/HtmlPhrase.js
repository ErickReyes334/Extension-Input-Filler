"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const HtmlPhrase = (props) => {
    const { phrase, as } = props;
    const Component = as === undefined ? "span" : as;
    // eslint-disable-next-line react/no-danger
    return <Component dangerouslySetInnerHTML={{ __html: phrase }}/>;
};
HtmlPhrase.defaultProps = {
    as: "span",
};
exports.default = HtmlPhrase;
