"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const helpers_1 = require("src/common/helpers");
const GetProModal = (props) => {
    return (<react_bootstrap_1.Modal show={props.isOpen} onHide={props.onClose}>
      <react_bootstrap_1.Modal.Header closeButton>
        <react_bootstrap_1.Modal.Title>{(0, helpers_1.GetMessage)("upgradeToFakeFillerPro")}</react_bootstrap_1.Modal.Title>
      </react_bootstrap_1.Modal.Header>
      <react_bootstrap_1.Modal.Body>
        <p>You need to upgrade to Fake Filler Pro to create more than 25 custom fields.</p>

        <div className="alert alert-info">
          <p>By upgrading to Fake Filler Pro, you unlock these amazing features:</p>
          <ul>
            <li>
              Create <b>UNLIMITED</b> custom fields.
            </li>
            <li>Sync your settings across all you browsers</li>
            <li>Create URL-specific custom fields (multiple profiles)</li>
          </ul>
        </div>
      </react_bootstrap_1.Modal.Body>
      <react_bootstrap_1.Modal.Footer className="justify-content-center">
        <a className="btn btn-primary" href="https://fakefiller.com/#pricing">
          {(0, helpers_1.GetMessage)("upgradeToFakeFillerPro")}
        </a>
      </react_bootstrap_1.Modal.Footer>
    </react_bootstrap_1.Modal>);
};
exports.default = GetProModal;
