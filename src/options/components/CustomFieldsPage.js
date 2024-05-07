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
const react_router_dom_1 = require("react-router-dom");
const helpers_1 = require("src/common/helpers");
const actions_1 = require("src/options/actions");
const CustomFieldsView_1 = __importDefault(require("src/options/components/custom-fields/CustomFieldsView"));
const Introduction_1 = __importDefault(require("src/options/components/custom-fields/Introduction"));
const ProfilesView_1 = __importDefault(require("src/options/components/custom-fields/ProfilesView"));
function CustomFieldsPage() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { index } = (0, react_router_dom_1.useParams)();
    const profileIndex = parseInt(String(index || -1), 10);
    const isFetching = (0, react_redux_1.useSelector)((state) => state.optionsData.isFetching);
    const options = (0, react_redux_1.useSelector)((state) => state.optionsData.options);
    const isProEdition = (0, react_redux_1.useSelector)((state) => state.authData.claims ? state.authData.claims.subscribed : false);
    (0, react_1.useEffect)(() => {
        dispatch((0, actions_1.getOptions)());
    }, [dispatch]);
    if (isFetching || options === null) {
        return <div>{(0, helpers_1.GetMessage)("loading")}</div>;
    }
    let customFieldsList;
    if (profileIndex < 0) {
        customFieldsList = options.fields;
    }
    else if (profileIndex < options.profiles.length) {
        customFieldsList = options.profiles[profileIndex].fields;
    }
    else {
        return <react_router_dom_1.Redirect to="/custom-fields"/>;
    }
    return (<>
      <h2>{(0, helpers_1.GetMessage)("customFields_title")}</h2>
      <Introduction_1.default />
      <hr />
      <ProfilesView_1.default isProEdition={isProEdition} profileIndex={profileIndex} profiles={options.profiles || []}>
        <CustomFieldsView_1.default isProEdition={isProEdition} customFields={customFieldsList} profileIndex={profileIndex}/>
      </ProfilesView_1.default>
    </>);
}
exports.default = CustomFieldsPage;
