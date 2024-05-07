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
const DataTypeSelectField_1 = __importDefault(require("src/options/components/custom-fields/DataTypeSelectField"));
const AlphanumericOptions_1 = __importDefault(require("src/options/components/custom-fields/data-types/AlphanumericOptions"));
const DateOptions_1 = __importDefault(require("src/options/components/custom-fields/data-types/DateOptions"));
const EmailOptions_1 = __importDefault(require("src/options/components/custom-fields/data-types/EmailOptions"));
const NumberOptions_1 = __importDefault(require("src/options/components/custom-fields/data-types/NumberOptions"));
const RandomizedListOptions_1 = __importDefault(require("src/options/components/custom-fields/data-types/RandomizedListOptions"));
const RegExOptions_1 = __importDefault(require("src/options/components/custom-fields/data-types/RegExOptions"));
const TelephoneOptions_1 = __importDefault(require("src/options/components/custom-fields/data-types/TelephoneOptions"));
const TextOptions_1 = __importDefault(require("src/options/components/custom-fields/data-types/TextOptions"));
const validate = (values) => {
    const errors = {};
    let hasValidType = true;
    if (!values.type) {
        errors.type = (0, helpers_1.GetMessage)("customFields_validation_missingType");
        hasValidType = false;
    }
    if (!values.name || values.name.trim().length === 0) {
        errors.name = (0, helpers_1.GetMessage)("customFields_validation_missingName");
    }
    if (!values.match || values.match.trim().length === 0) {
        errors.match = (0, helpers_1.GetMessage)("customFields_validation_missingMatch");
    }
    if (hasValidType) {
        if (values.type === "telephone" && (!values.telephoneTemplate || values.telephoneTemplate.trim().length === 0)) {
            errors.telephoneTemplate = (0, helpers_1.GetMessage)("customFields_validation_missingTelephoneTemplate");
        }
        if (values.type === "number") {
            const minValue = parseInt(values.numberMin, 10);
            if (Number.isNaN(minValue)) {
                errors.numberMin = (0, helpers_1.GetMessage)("customFields_validation_missingMinValue");
            }
            if (!values.numberMax) {
                errors.numberMax = (0, helpers_1.GetMessage)("customFields_validation_missingMaxValue");
            }
            if (values.numberMin && values.numberMax && parseInt(values.numberMax, 10) < parseInt(values.numberMin, 10)) {
                errors.numberMax = (0, helpers_1.GetMessage)("customFields_validation_invalidMinMaxValue");
            }
            const decimalValue = parseInt(values.numberDecimalPlaces, 10);
            if (Number.isNaN(decimalValue)) {
                errors.numberDecimalPlaces = (0, helpers_1.GetMessage)("customFields_validation_missingDecimalPlaces");
            }
        }
        if (values.type === "text") {
            if (!values.textMin) {
                errors.textMin = (0, helpers_1.GetMessage)("customFields_validation_missingMinValue");
            }
            if (!values.textMax) {
                errors.textMax = (0, helpers_1.GetMessage)("customFields_validation_missingMaxValue");
            }
            if (!values.textMaxLength) {
                errors.textMaxLength = (0, helpers_1.GetMessage)("customFields_validation_missingMaxLength");
            }
            if (values.textMin && parseInt(values.textMin, 10) < 1) {
                errors.textMin = (0, helpers_1.GetMessage)("customFields_validation_invalidMaxValue");
            }
            if (values.textMin && values.textMax && parseInt(values.textMax, 10) < parseInt(values.textMin, 10)) {
                errors.textMax = (0, helpers_1.GetMessage)("customFields_validation_invalidMinMaxValue");
            }
            if (values.textMaxLength && parseInt(values.textMaxLength, 10) < 1) {
                errors.textMaxLength = (0, helpers_1.GetMessage)("customFields_validation_invalidMaxLengthValue");
            }
        }
        if (values.type === "date") {
            if (!values.dateTemplate || values.dateTemplate.trim().length === 0) {
                errors.dateTemplate = (0, helpers_1.GetMessage)("customFields_validation_missingDateTemplate");
            }
            const dateMin = parseInt(values.dateMin, 10);
            const dateMax = parseInt(values.dateMax, 10);
            const dateMinDate = Date.parse(values.dateMinDate);
            const dateMaxDate = Date.parse(values.dateMaxDate);
            if (!Number.isNaN(dateMin) && !Number.isNaN(dateMinDate)) {
                errors.dateMinDate = (0, helpers_1.GetMessage)("customFields_validation_onlyOneValueInGroup");
            }
            if (!Number.isNaN(dateMax) && !Number.isNaN(dateMaxDate)) {
                errors.dateMaxDate = (0, helpers_1.GetMessage)("customFields_validation_onlyOneValueInGroup");
            }
            if (Number.isNaN(dateMin) && Number.isNaN(dateMinDate)) {
                errors.dateMinDate = (0, helpers_1.GetMessage)("customFields_validation_atLeastOneValueInGroup");
            }
            if (Number.isNaN(dateMax) && Number.isNaN(dateMaxDate)) {
                errors.dateMaxDate = (0, helpers_1.GetMessage)("customFields_validation_atLeastOneValueInGroup");
            }
            if (!Number.isNaN(dateMin) && !Number.isNaN(dateMax) && dateMin > dateMax) {
                errors.dateMax = (0, helpers_1.GetMessage)("customFields_validation_invalidMinMaxValue");
            }
            if (!Number.isNaN(dateMinDate) && !Number.isNaN(dateMaxDate) && dateMinDate > dateMaxDate) {
                errors.dateMaxDate = (0, helpers_1.GetMessage)("customFields_validation_invalidMinMaxValue");
            }
        }
        if (values.type === "email") {
            if (!values.emailUsername) {
                errors.emailUsername = (0, helpers_1.GetMessage)("customFields_validation_invalidEmailUsername");
            }
            else if (values.emailUsername === "list" &&
                (!values.emailUsernameList || values.emailUsernameList.trim().length === 0)) {
                errors.emailUsernameList = (0, helpers_1.GetMessage)("customFields_validation_missingEmailUsernameList");
            }
            else if (values.emailUsername === "regex" &&
                (!values.emailUsernameRegEx || values.emailUsernameRegEx.trim().length === 0)) {
                errors.emailUsernameRegEx = (0, helpers_1.GetMessage)("customFields_validation_missingEmailUsernameRegEx");
            }
            if (!values.emailHostname) {
                errors.emailHostname = (0, helpers_1.GetMessage)("customFields_validation_invalidEmailHostname");
            }
            else if (values.emailHostname === "list" &&
                (!values.emailHostnameList || values.emailHostnameList.trim().length === 0)) {
                errors.emailHostnameList = (0, helpers_1.GetMessage)("customFields_validation_missingEmailHostnameList");
            }
        }
        if (values.type === "alphanumeric" &&
            (!values.alphanumericTemplate || values.alphanumericTemplate.trim().length === 0)) {
            errors.alphanumericTemplate = (0, helpers_1.GetMessage)("customFields_validation_missingAlNumTemplate");
        }
        if (values.type === "regex" && (!values.regexTemplate || values.regexTemplate.trim().length === 0)) {
            errors.regexTemplate = (0, helpers_1.GetMessage)("customFields_validation_missingRegEx");
        }
        if (values.type === "randomized-list" && (!values.list || values.list.trim().length === 0)) {
            errors.list = (0, helpers_1.GetMessage)("customFields_validation_missingRandomItems");
        }
    }
    return errors;
};
const CustomFieldModal = (props) => {
    const { customField } = props;
    const initialValues = {
        match: "",
        name: "",
        numberMin: "",
        numberMax: "",
        numberDecimalPlaces: "",
        textMin: "",
        textMax: "",
        textMaxLength: "",
        telephoneTemplate: "",
        dateTemplate: "",
        dateMin: "",
        dateMax: "",
        dateMinDate: "",
        dateMaxDate: "",
        alphanumericTemplate: "",
        regexTemplate: "",
        list: "",
        emailPrefix: "",
        emailHostname: "list",
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        emailHostnameList: helpers_1.DEFAULT_EMAIL_CUSTOM_FIELD.emailHostnameList.join(", "),
        emailUsername: "random",
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        emailUsernameList: helpers_1.DEFAULT_EMAIL_CUSTOM_FIELD.emailUsernameList.join(", "),
        emailUsernameRegEx: "",
    };
    if (customField) {
        initialValues.name = customField.name;
        initialValues.type = customField.type;
        initialValues.match = customField.match.join(", ");
        switch (initialValues.type) {
            case "alphanumeric":
                initialValues.alphanumericTemplate = customField.template || "";
                break;
            case "date":
                initialValues.dateTemplate = customField.template || "";
                if (!Number.isNaN(Number(customField.min))) {
                    initialValues.dateMin = String(customField.min);
                }
                if (!Number.isNaN(Number(customField.max))) {
                    initialValues.dateMax = String(customField.max);
                }
                if (customField.minDate) {
                    initialValues.dateMinDate = customField.minDate;
                }
                if (customField.maxDate) {
                    initialValues.dateMaxDate = customField.maxDate;
                }
                break;
            case "email": {
                initialValues.emailPrefix = customField.emailPrefix || "";
                initialValues.emailHostname = customField.emailHostname || "list";
                initialValues.emailHostnameList = customField.emailHostnameList
                    ? customField.emailHostnameList.join(", ")
                    : initialValues.emailHostnameList;
                initialValues.emailUsername = customField.emailUsername || "list";
                initialValues.emailUsernameRegEx = customField.emailUsernameRegEx || "";
                initialValues.emailUsernameList = customField.emailUsernameList
                    ? customField.emailUsernameList.join(", ")
                    : initialValues.emailUsernameList;
                break;
            }
            case "number":
                initialValues.numberMax = String(customField.max);
                initialValues.numberMin = String(customField.min);
                initialValues.numberDecimalPlaces = String(customField.decimalPlaces);
                break;
            case "randomized-list":
                initialValues.list = customField.list ? customField.list.join("\n") : "";
                break;
            case "regex":
                initialValues.regexTemplate = customField.template || "";
                break;
            case "telephone":
                initialValues.telephoneTemplate = customField.template || "";
                break;
            case "text":
                initialValues.textMax = String(customField.max);
                initialValues.textMin = String(customField.min);
                initialValues.textMaxLength = String(customField.maxLength);
                break;
            default:
                break;
        }
    }
    return (<react_bootstrap_1.Modal size="lg" show={props.isOpen} onHide={props.onClose}>
      <formik_1.Formik initialValues={initialValues} validate={validate} onSubmit={props.onSave}>
        {({ values, isSubmitting, isValid }) => (<formik_1.Form>
            <react_bootstrap_1.Modal.Header closeButton>
              <react_bootstrap_1.Modal.Title>{(0, helpers_1.GetMessage)("customFieldDetails_title")}</react_bootstrap_1.Modal.Title>
            </react_bootstrap_1.Modal.Header>
            <react_bootstrap_1.Modal.Body>
              <DataTypeSelectField_1.default />
              <TextField_1.default name="name" label={(0, helpers_1.GetMessage)("customFields_label_friendlyName")}/>
              <TextField_1.default name="match" label={(0, helpers_1.GetMessage)("customFields_label_match")} placeholder={(0, helpers_1.GetMessage)("customFields_label_match_placeholder")} helpText={(0, helpers_1.GetMessage)("customFields_label_match_helpText")}/>
              {values.type === "alphanumeric" && <AlphanumericOptions_1.default />}
              {values.type === "date" && <DateOptions_1.default />}
              {values.type === "email" && <EmailOptions_1.default {...values}/>}
              {values.type === "number" && <NumberOptions_1.default />}
              {values.type === "randomized-list" && <RandomizedListOptions_1.default />}
              {values.type === "regex" && <RegExOptions_1.default regexTemplate={values.regexTemplate}/>}
              {values.type === "telephone" && <TelephoneOptions_1.default />}
              {values.type === "text" && <TextOptions_1.default />}
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
exports.default = CustomFieldModal;
