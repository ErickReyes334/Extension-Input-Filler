"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const helpers_1 = require("src/common/helpers");
const actions_1 = require("src/options/actions");
const BackupAndRestorePage_1 = __importDefault(require("src/options/components/BackupAndRestorePage"));
const ChangeLogPage_1 = __importDefault(require("src/options/components/ChangeLogPage"));
const CustomFieldsPage_1 = __importDefault(require("src/options/components/CustomFieldsPage"));
const GeneralSettingsPage_1 = __importDefault(require("src/options/components/GeneralSettingsPage"));
const KeyboardShortcutsPage_1 = __importDefault(require("src/options/components/KeyboardShortcutsPage"));
const LoginPage_1 = __importDefault(require("src/options/components/LoginPage"));
const MyAccountPage_1 = __importDefault(require("src/options/components/MyAccountPage"));
const ExternalLink_1 = __importDefault(require("src/options/components/common/ExternalLink"));
const HtmlPhrase_1 = __importDefault(require("src/options/components/common/HtmlPhrase"));
const ScrollToTop_1 = __importDefault(require("src/options/components/common/ScrollToTop"));
require("src/options/components/App.scss");
function App() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const isLoggedIn = (0, react_redux_1.useSelector)((state) => !!state.authData.user);
    const sendFeedbackMessage = chrome.i18n.getMessage("leftNav_sendFeedback", ["hussein@fakefiller.com"]);
    function handleResetSettings(event) {
        event.preventDefault();
        // eslint-disable-next-line no-alert
        if (window.confirm((0, helpers_1.GetMessage)("leftNav_confirmResetSettings"))) {
            const options = (0, helpers_1.FakeFillerDefaultOptions)();
            dispatch((0, actions_1.saveOptions)(options));
        }
    }
    return (<>
      <ScrollToTop_1.default />
      <react_bootstrap_1.Navbar bg="dark" variant="dark" expand="lg">
        <react_bootstrap_1.Navbar.Brand>
          <img src="images/logo-white.svg" height="30" alt={(0, helpers_1.GetMessage)("extensionName")}/>
        </react_bootstrap_1.Navbar.Brand>
        <react_bootstrap_1.Navbar.Toggle aria-controls="main-navbar-nav"/>
        <react_bootstrap_1.Navbar.Collapse id="main-navbar-nav">
          <react_bootstrap_1.Nav className="mr-auto">
            <react_bootstrap_1.Nav.Link as={react_router_dom_1.NavLink} to="/" exact>
              {(0, helpers_1.GetMessage)("leftNav_General")}
            </react_bootstrap_1.Nav.Link>
            <react_bootstrap_1.Nav.Link as={react_router_dom_1.NavLink} to="/custom-fields">
              {(0, helpers_1.GetMessage)("leftNav_customFields")}
            </react_bootstrap_1.Nav.Link>
            <react_bootstrap_1.Nav.Link as={react_router_dom_1.NavLink} to="/keyboard-shortcuts">
              {(0, helpers_1.GetMessage)("leftNav_keyboardShortcuts")}
            </react_bootstrap_1.Nav.Link>
            <react_bootstrap_1.Nav.Link as={react_router_dom_1.NavLink} to="/backup">
              {(0, helpers_1.GetMessage)("leftNav_backupRestore")}
            </react_bootstrap_1.Nav.Link>
            <react_bootstrap_1.Nav.Link href="https://github.com/FakeFiller/fake-filler-extension/wiki" target="_blank">
              Help
            </react_bootstrap_1.Nav.Link>
          </react_bootstrap_1.Nav>
          <react_bootstrap_1.Nav>
            {isLoggedIn && (<react_bootstrap_1.Nav.Link as={react_router_dom_1.NavLink} to="/account">
                My Account
              </react_bootstrap_1.Nav.Link>)}
            {!isLoggedIn && (<react_bootstrap_1.Nav.Link as={react_router_dom_1.NavLink} to="/login">
                Login
              </react_bootstrap_1.Nav.Link>)}
          </react_bootstrap_1.Nav>
        </react_bootstrap_1.Navbar.Collapse>
      </react_bootstrap_1.Navbar>
      <div id="main-content" className="container">
        <react_router_dom_1.Route path="/" exact component={GeneralSettingsPage_1.default}/>
        <react_router_dom_1.Route path="/custom-fields/:index?" component={CustomFieldsPage_1.default}/>
        <react_router_dom_1.Route path="/keyboard-shortcuts" component={KeyboardShortcutsPage_1.default}/>
        <react_router_dom_1.Route path="/backup" component={BackupAndRestorePage_1.default}/>
        <react_router_dom_1.Route path="/changelog" component={ChangeLogPage_1.default}/>
        <react_router_dom_1.Route path="/login" component={LoginPage_1.default}/>
        <react_router_dom_1.Route path="/account" component={MyAccountPage_1.default}/>
      </div>
      <footer id="main-footer" className="container">
        <HtmlPhrase_1.default phrase={sendFeedbackMessage} as="p"/>
        <ul className="list-inline">
          <li className="list-inline-item">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" onClick={handleResetSettings}>
              {(0, helpers_1.GetMessage)("leftNav_restoreFactorySettings")}
            </a>
          </li>
          <li className="list-inline-item">
            <react_router_dom_1.Link to="/changelog">{(0, helpers_1.GetMessage)("leftNav_changelog")}</react_router_dom_1.Link>
          </li>
          <li className="list-inline-item">
            <ExternalLink_1.default url="https://github.com/FakeFiller/fake-filler-extension/issues">
              {(0, helpers_1.GetMessage)("leftNav_issueTracker")}
            </ExternalLink_1.default>
          </li>
        </ul>
      </footer>
    </>);
}
exports.default = App;
