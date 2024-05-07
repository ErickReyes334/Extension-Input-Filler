"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formik_1 = require("formik");
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const helpers_1 = require("src/common/helpers");
const TextField_1 = __importDefault(require("src/options/components/common/TextField"));
const validate = (values) => {
    const errors = {};
    if (!values.name || values.name.trim().length === 0) {
        errors.name = (0, helpers_1.GetMessage)("profile_validation_missingName");
    }
    if (!values.urlMatch || values.urlMatch.trim().length === 0) {
        errors.urlMatch = (0, helpers_1.GetMessage)("profile_validation_missingUrlMatch");
    }
    else {
        const expression = values.urlMatch.trim();
        try {
            if (!new RegExp(expression)) {
                errors.urlMatch = "Please enter a valid regular expression.";
            }
        }
        catch (e) {
            errors.urlMatch = "Please enter a valid regular expression.";
        }
    }
    return errors;
};
const ProfileModal = (props) => {
    const initialValues = {
        name: props.profile ? props.profile.name : "",
        urlMatch: props.profile ? props.profile.urlMatch : "",
        fields: [],
    };
    return (<react_bootstrap_1.Modal size="lg" show={props.isOpen} onHide={props.onClose}>
      <formik_1.Formik initialValues={initialValues} validate={validate} onSubmit={props.onSave}>
        {({ isSubmitting, isValid }) => (<formik_1.Form>
            <react_bootstrap_1.Modal.Header closeButton>
              <react_bootstrap_1.Modal.Title>{(0, helpers_1.GetMessage)("profile_modal_title")}</react_bootstrap_1.Modal.Title>
            </react_bootstrap_1.Modal.Header>
            <react_bootstrap_1.Modal.Body>
              <TextField_1.default name="name" label={(0, helpers_1.GetMessage)("profile_label_name")}/>
              <TextField_1.default name="urlMatch" label={(0, helpers_1.GetMessage)("profile_label_urlMatch")} helpText={(0, helpers_1.GetMessage)("profile_label_urlMatch_helpText")}/>
            </react_bootstrap_1.Modal.Body>
            <react_bootstrap_1.Modal.Footer>
              <button type="button" className="btn btn-outline-secondary" onClick={props.onClose}>
                {(0, helpers_1.GetMessage)("Cancel")}
              </button>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting || !isValid}>
                {(0, helpers_1.GetMessage)("Save")}
              </button>
            </react_bootstrap_1.Modal.Footer>
          </formik_1.Form>)}
      </formik_1.Formik>
    </react_bootstrap_1.Modal>);
};
ProfileModal.defaultProps = {
    profile: undefined,
};
exports.default = ProfileModal;
