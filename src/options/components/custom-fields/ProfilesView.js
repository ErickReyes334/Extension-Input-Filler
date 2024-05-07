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
const ProfileModal_1 = __importDefault(require("src/options/components/custom-fields/ProfileModal"));
const ProfilesView = (props) => {
    const { isProEdition, profiles, profileIndex } = props;
    const [modalIsOpen, setModalIsOpen] = (0, react_1.useState)(false);
    const [profile, setProfile] = (0, react_1.useState)();
    const [actionType, setActionType] = (0, react_1.useState)();
    const history = (0, react_router_dom_1.useHistory)();
    const dispatch = (0, react_redux_1.useDispatch)();
    function closeModal() {
        setModalIsOpen(false);
        setProfile(undefined);
        setActionType(undefined);
    }
    function newProfile() {
        if (isProEdition) {
            setProfile(undefined);
            setActionType("create");
            setModalIsOpen(true);
        }
    }
    function handleEdit() {
        if (isProEdition) {
            setProfile(profiles[profileIndex]);
            setActionType("edit");
            setModalIsOpen(true);
        }
    }
    function handleDelete() {
        if (isProEdition) {
            // eslint-disable-next-line no-alert
            if (profileIndex >= 0 && window.confirm((0, helpers_1.GetMessage)("profile_delete_confirm_message"))) {
                dispatch((0, actions_1.deleteProfile)(profileIndex));
                history.push("/custom-fields");
            }
        }
    }
    function handleSave(formValues) {
        if (isProEdition) {
            if (actionType === "edit") {
                dispatch((0, actions_1.saveProfile)(formValues, profileIndex));
            }
            else {
                dispatch((0, actions_1.createProfile)(formValues));
            }
            closeModal();
        }
    }
    if (!isProEdition && profiles.length === 0) {
        return <>{props.children}</>;
    }
    return (<>
      <div className="row">
        <div className="col-3">
          <h3 className="h6">{(0, helpers_1.GetMessage)("profiles")}</h3>
          <nav className="nav nav-pills flex-column">
            <react_router_dom_1.NavLink to="/custom-fields" className="nav-link" exact>
              {(0, helpers_1.GetMessage)("profiles_default_name")}
            </react_router_dom_1.NavLink>
            {profiles.map((p, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <react_router_dom_1.NavLink key={index} to={`/custom-fields/${index}`} className="nav-link" exact>
                {p.name}
              </react_router_dom_1.NavLink>))}
          </nav>
          {isProEdition && (<>
              <p />
              <div className="text-center">
                <button type="button" className="btn btn-sm btn-link" onClick={newProfile}>
                  {(0, helpers_1.GetMessage)("profiles_create_button_label")}
                </button>
              </div>
            </>)}
        </div>
        <div className="col-9">
          {profileIndex >= 0 && (<>
              {!isProEdition && (<div className="alert alert-warning">
                  {(0, helpers_1.GetMessage)("profile_thisProfileDisabled")}{" "}
                  <a className="alert-link" href="https://fakefiller.com/#pricing">
                    {(0, helpers_1.GetMessage)("upgradeToFakeFillerPro")}
                  </a>
                </div>)}
              {isProEdition && (<div className="float-right">
                  <button type="button" className="btn btn-sm btn-link" onClick={handleEdit}>
                    <img src="images/edit.svg" width="12" height="12" alt={(0, helpers_1.GetMessage)("edit")}/>
                  </button>
                </div>)}
              <h3 className="h5">
                {(0, helpers_1.GetMessage)("profile")}: {profiles[profileIndex].name}
              </h3>
              <p className="text-muted">
                {(0, helpers_1.GetMessage)("profile_url_matching_expression")}: <code>{profiles[profileIndex].urlMatch}</code>
              </p>
            </>)}

          {props.children}

          {isProEdition && profileIndex >= 0 && (<div className="text-center mt-5">
              <button type="button" onClick={handleDelete} className="btn btn-sm btn-outline-danger">
                {(0, helpers_1.GetMessage)("profiles_delete_button_label")}
              </button>
            </div>)}
        </div>
      </div>

      <ProfileModal_1.default isOpen={modalIsOpen} onClose={closeModal} onSave={handleSave} profile={profile}/>
    </>);
};
exports.default = ProfilesView;
