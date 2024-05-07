"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = require("react-dom");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const firebase_1 = require("src/common/firebase");
const actions_1 = require("src/options/actions");
const App_1 = __importDefault(require("src/options/components/App"));
const store_1 = __importDefault(require("src/options/store"));
let isProEnabled = false;
function handleAuthStateChange(user, claims) {
    isProEnabled = claims ? claims.subscribed : false;
    store_1.default.dispatch((0, actions_1.updateAuthState)(user, claims));
}
function handleOptionsChange(options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isProEnabled) {
            store_1.default.dispatch({ type: "RECEIVED_OPTIONS", options });
        }
    });
}
(0, firebase_1.onAuthStateChange)(handleAuthStateChange);
(0, firebase_1.onOptionsChange)(handleOptionsChange);
const optionsApp = (<react_redux_1.Provider store={store_1.default}>
    <react_router_dom_1.HashRouter>
      <react_router_dom_1.Route path="/" component={App_1.default}/>
    </react_router_dom_1.HashRouter>
  </react_redux_1.Provider>);
(0, react_dom_1.render)(optionsApp, document.getElementById("root"));
