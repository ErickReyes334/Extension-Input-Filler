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
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const firebase_1 = require("src/common/firebase");
const helpers_1 = require("src/common/helpers");
const HtmlPhrase_1 = __importDefault(require("src/options/components/common/HtmlPhrase"));
const MyAccountPage = () => {
    const user = (0, react_redux_1.useSelector)((state) => state.authData.user);
    const claims = (0, react_redux_1.useSelector)((state) => state.authData.claims);
    const [optionsLastUpdatedTimestamp, setOptionsLastUpdatedTimestamp] = (0, react_1.useState)();
    const history = (0, react_router_dom_1.useHistory)();
    (0, react_1.useEffect)(() => {
        (0, firebase_1.getOptionsLastUpdatedTimestamp)().then((timestamp) => {
            setOptionsLastUpdatedTimestamp(timestamp);
        });
    }, []);
    function handleLogout() {
        (0, firebase_1.logout)().then(() => {
            history.push("/login");
        });
    }
    function handleStartSync() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = yield (0, helpers_1.GetFakeFillerOptions)();
            yield (0, firebase_1.saveOptionsToDb)(options);
            setOptionsLastUpdatedTimestamp(new Date());
        });
    }
    if (!user || !claims) {
        return <react_router_dom_1.Redirect to="/login"/>;
    }
    return (<div>
      <h2>{(0, helpers_1.GetMessage)("account_myAccount")}</h2>

      <div className="row">
        <div className="col-md-8">
          <dl>
            <dt>{(0, helpers_1.GetMessage)("account_emailAddress")}</dt>
            <dd>{user.email}</dd>

            <dt>{(0, helpers_1.GetMessage)("account_edition")}</dt>
            <dd>
              {claims.subscribed ? (<span className="badge badge-success">PRO</span>) : (<span className="badge badge-secondary">Free</span>)}
            </dd>

            {claims.subscribed && optionsLastUpdatedTimestamp && (<>
                <dt>{(0, helpers_1.GetMessage)("account_settingsLastUpdated")}</dt>
                <dd>
                  {optionsLastUpdatedTimestamp.toLocaleString(undefined, {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            })}
                </dd>
              </>)}
          </dl>
        </div>
        <div className="col-md-4">
          {claims.subscribed && !optionsLastUpdatedTimestamp && (<div>
              <div className="d-flex">
                <img src="images/sync.svg" width="24" height="24" alt="Sync"/>
                <h3 className="h5 ml-2">{(0, helpers_1.GetMessage)("account_enableSync_title")}</h3>
              </div>
              <p>{(0, helpers_1.GetMessage)("account_enableSync_message")}</p>
              <div className="sync-tip rounded p-2 mb-3">
                <HtmlPhrase_1.default phrase={(0, helpers_1.GetMessage)("account_enableSync_tip")}/>
              </div>
              <button type="button" className="btn btn-sm btn-outline-primary" onClick={handleStartSync}>
                {(0, helpers_1.GetMessage)("account_enableSync_button")}
              </button>
            </div>)}

          {!claims.subscribed && (<>
              <h3 className="h6">{(0, helpers_1.GetMessage)("account_showSupportTitle")}</h3>
              <p>
                <span role="img" aria-label="">
                  👋
                </span>{" "}
                {(0, helpers_1.GetMessage)("account_showSupportMessage")}
              </p>
              <div>
                <a href="https://fakefiller.com/#pricing" className="btn btn-sm btn-primary">
                  {(0, helpers_1.GetMessage)("account_showSupportButton")}
                </a>
              </div>
            </>)}
        </div>
      </div>

      <div className="mt-5">
        {claims.subscribed && (<a className="btn btn-secondary btn-sm mr-3" href="http://fakefiller.com/account/">
            {(0, helpers_1.GetMessage)("account_manageAccount")}
          </a>)}
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>
          {(0, helpers_1.GetMessage)("account_logout")}
        </button>
      </div>
    </div>);
};
exports.default = MyAccountPage;
