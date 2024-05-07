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
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const helpers_1 = require("src/common/helpers");
const actions_1 = require("src/options/actions");
const HtmlPhrase_1 = __importDefault(require("src/options/components/common/HtmlPhrase"));
const KeyboardShortcutsPage = () => {
    const isFetching = (0, react_redux_1.useSelector)((state) => state.keyboardShortcutsData.isFetching);
    const keyboardShortcuts = (0, react_redux_1.useSelector)((state) => state.keyboardShortcutsData.shortcuts);
    const dispatch = (0, react_redux_1.useDispatch)();
    (0, react_1.useEffect)(() => {
        dispatch((0, actions_1.getKeyboardShortcuts)());
    }, [dispatch]);
    function getTranslatedDescription(key) {
        if (key.startsWith("__MSG_")) {
            return (0, helpers_1.GetMessage)(key.replace("__MSG_", "").replace("__", ""));
        }
        return key;
    }
    const notSetText = <small>{(0, helpers_1.GetMessage)("kbdShortcuts_notSet")}</small>;
    if (isFetching) {
        return <div>{(0, helpers_1.GetMessage)("loading")}</div>;
    }
    return (<>
      <h2>{(0, helpers_1.GetMessage)("kbdShortcuts_title")}</h2>
      <table className="table table-bordered table-sm">
        <tbody>
          {keyboardShortcuts.map((item) => {
            if (item.description) {
                return (<tr key={item.name}>
                  <td className="narrow text-center">{item.shortcut ? <kbd>{item.shortcut}</kbd> : notSetText}</td>
                  <td>{getTranslatedDescription(item.description)}</td>
                </tr>);
            }
            return null;
        })}
        </tbody>
      </table>
      <HtmlPhrase_1.default phrase={(0, helpers_1.GetMessage)("kbdShortcuts_changeInstructions")} as="p"/>
    </>);
};
exports.default = KeyboardShortcutsPage;
