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
const GeneralSettingsForm_1 = __importDefault(require("src/options/components/general-settings/GeneralSettingsForm"));
const GeneralSettingsPage = () => {
    const [showSavedMessage, setShowSavedMessage] = (0, react_1.useState)(false);
    const isFetching = (0, react_redux_1.useSelector)((state) => state.optionsData.isFetching);
    const options = (0, react_redux_1.useSelector)((state) => state.optionsData.options);
    const dispatch = (0, react_redux_1.useDispatch)();
    (0, react_1.useEffect)(() => {
        dispatch((0, actions_1.getOptions)());
    }, [dispatch]);
    function handleSave(formValues) {
        if (options) {
            dispatch((0, actions_1.saveOptions)(options, formValues)).then(() => {
                setShowSavedMessage(true);
            });
        }
    }
    if (isFetching || options === null) {
        return <div>{(0, helpers_1.GetMessage)("loading")}</div>;
    }
    return <GeneralSettingsForm_1.default options={options} showSavedMessage={showSavedMessage} onSave={handleSave}/>;
};
exports.default = GeneralSettingsPage;
