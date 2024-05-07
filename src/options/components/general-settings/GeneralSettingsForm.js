"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formik_1 = require("formik");
const react_1 = __importDefault(require("react"));
const helpers_1 = require("src/common/helpers");
const CheckboxField_1 = __importDefault(require("src/options/components/common/CheckboxField"));
const HtmlPhrase_1 = __importDefault(require("src/options/components/common/HtmlPhrase"));
const RadioButtonField_1 = __importDefault(require("src/options/components/common/RadioButtonField"));
const TextField_1 = __importDefault(require("src/options/components/common/TextField"));
const validate = (values) => {
    const errors = {};
    if (!values.fieldMatchId &&
        !values.fieldMatchName &&
        !values.fieldMatchLabel &&
        !values.fieldMatchClass &&
        !values.fieldMatchPlaceholder) {
        errors.fieldMatchId = (0, helpers_1.GetMessage)("generalSettings_validation_enterAtLeastOneMatch");
    }
    if (!values.defaultMaxLength || values.defaultMaxLength.length === 0) {
        errors.defaultMaxLength = (0, helpers_1.GetMessage)("generalSettings_validation_invalidDefaultMaxLength");
    }
    if (values.defaultMaxLength && parseInt(values.defaultMaxLength, 10) < 1) {
        errors.defaultMaxLength = (0, helpers_1.GetMessage)("generalSettings_validation_invalidDefaultMaxLength");
    }
    return errors;
};
const GeneralSettingsForm = (props) => {
    function handleSubmit(values, actions) {
        actions.setSubmitting(true);
        props.onSave(values);
        actions.setSubmitting(false);
    }
    const initialValues = {};
    initialValues.agreeTermsFields = props.options.agreeTermsFields.join(", ");
    initialValues.confirmFields = props.options.confirmFields.join(", ");
    initialValues.defaultMaxLength = String(props.options.defaultMaxLength);
    initialValues.enableContextMenu = props.options.enableContextMenu;
    initialValues.ignoreFieldsWithContent = props.options.ignoreFieldsWithContent;
    initialValues.ignoreHiddenFields = props.options.ignoreHiddenFields;
    initialValues.ignoredFields = props.options.ignoredFields.join(", ");
    initialValues.triggerClickEvents = props.options.triggerClickEvents;
    initialValues.passwordSettingsMode = props.options.passwordSettings.mode;
    initialValues.passwordSettingsPassword = props.options.passwordSettings.password;
    initialValues.fieldMatchId = props.options.fieldMatchSettings.matchId;
    initialValues.fieldMatchName = props.options.fieldMatchSettings.matchName;
    initialValues.fieldMatchLabel = props.options.fieldMatchSettings.matchLabel;
    initialValues.fieldMatchClass = props.options.fieldMatchSettings.matchClass;
    initialValues.fieldMatchPlaceholder = props.options.fieldMatchSettings.matchPlaceholder;
    initialValues.fieldMatchAriaLabel = props.options.fieldMatchSettings.matchAriaLabel;
    initialValues.fieldMatchAriaLabelledBy = props.options.fieldMatchSettings.matchAriaLabelledBy;
    return (<formik_1.Formik initialValues={initialValues} enableReinitialize validate={validate} onSubmit={handleSubmit}>
      {({ isSubmitting, isValid }) => (<formik_1.Form>
          <h2>{(0, helpers_1.GetMessage)("generalSettings_passwordSettings")}</h2>

          <div className="form-group row">
            <label className="col-sm-3 col-form-label text-sm-right pt-0" htmlFor="passwordSettingsMode">
              {(0, helpers_1.GetMessage)("generalSettings_password")}
            </label>
            <div className="col-sm-9">
              <RadioButtonField_1.default name="passwordSettingsMode" value="random" label={(0, helpers_1.GetMessage)("generalSettings_password_randomLabel")}/>
              <RadioButtonField_1.default name="passwordSettingsMode" value="defined" label={(0, helpers_1.GetMessage)("generalSettings_password_useThisLabel")}/>
              <TextField_1.default name="passwordSettingsPassword"/>
            </div>
          </div>

          <h2>{(0, helpers_1.GetMessage)("generalSettings_fieldOptions")}</h2>

          <div className="form-group row">
            <label className="col-sm-3 col-form-label text-sm-right" htmlFor="ignoredFields">
              {(0, helpers_1.GetMessage)("generalSettings_ignoreFieldsMatch")}
            </label>
            <div className="col-sm-9">
              <TextField_1.default name="ignoredFields" placeholder={(0, helpers_1.GetMessage)("enterCsv")}/>
              <CheckboxField_1.default name="ignoreHiddenFields" label={(0, helpers_1.GetMessage)("generalSettings_ignoreHiddenFieldsLabel")}/>
              <CheckboxField_1.default name="ignoreFieldsWithContent" label={(0, helpers_1.GetMessage)("generalSettings_ignoreFieldsWithContentLabel")}/>
              <HtmlPhrase_1.default phrase={(0, helpers_1.GetMessage)("generalSettings_ignoreFieldsWithContentHelp")} as="div" className="form-text text-muted"/>
            </div>
          </div>

          <TextField_1.default name="confirmFields" label={(0, helpers_1.GetMessage)("generalSettings_confirmationFieldsMatch")} placeholder={(0, helpers_1.GetMessage)("enterCsv")} helpText={(0, helpers_1.GetMessage)("generalSettings_confirmFieldsHelp")}/>

          <TextField_1.default name="agreeTermsFields" label={(0, helpers_1.GetMessage)("generalSettings_agreeToTermsMatch")} placeholder={(0, helpers_1.GetMessage)("enterCsv")} helpText={(0, helpers_1.GetMessage)("generalSettings_agreeToTermsMatchHelp")}/>

          <div className="form-group row">
            <div className="col-sm-3 text-sm-right pt-0">{(0, helpers_1.GetMessage)("generalSettings_matchFieldsUsing")}</div>
            <div className="col-sm-9">
              <CheckboxField_1.default name="fieldMatchId" label={(0, helpers_1.GetMessage)("generalSettings_matchFields_useId")}/>
              <CheckboxField_1.default name="fieldMatchName" label={(0, helpers_1.GetMessage)("generalSettings_matchFields_useName")}/>
              <CheckboxField_1.default name="fieldMatchLabel" label={(0, helpers_1.GetMessage)("generalSettings_matchFields_useLabel")}/>
              <CheckboxField_1.default name="fieldMatchAriaLabel" label={(0, helpers_1.GetMessage)("generalSettings_matchFields_useAriaLabel")}/>
              <CheckboxField_1.default name="fieldMatchAriaLabelledBy" label={(0, helpers_1.GetMessage)("generalSettings_matchFields_useAriaLabelledBy")}/>
              <CheckboxField_1.default name="fieldMatchClass" label={(0, helpers_1.GetMessage)("generalSettings_matchFields_useClass")}/>
              <CheckboxField_1.default name="fieldMatchPlaceholder" label={(0, helpers_1.GetMessage)("generalSettings_matchFields_usePlaceholder")}/>
              <div className="form-text text-muted">{(0, helpers_1.GetMessage)("generalSettings_matchFields_help")}</div>
            </div>
          </div>

          <TextField_1.default name="defaultMaxLength" type="number" label={(0, helpers_1.GetMessage)("generalSettings_defaultMaxLength")} helpText={(0, helpers_1.GetMessage)("generalSettings_defaultMaxLength_help")}/>

          <h2>{(0, helpers_1.GetMessage)("generalSettings")}</h2>
          <CheckboxField_1.default name="triggerClickEvents" label={(0, helpers_1.GetMessage)("generalSettings_triggerEventsLabel")} title={(0, helpers_1.GetMessage)("generalSettings_triggerEvents")}/>
          <CheckboxField_1.default name="enableContextMenu" label={(0, helpers_1.GetMessage)("generalSettings_contextMenuLabel")} title={(0, helpers_1.GetMessage)("generalSettings_contextMenu")}/>

          <div className="row">
            <div className="col-sm-3">&nbsp;</div>
            <div className="col-sm-9">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting || !isValid}>
                {(0, helpers_1.GetMessage)("saveSettings")}
              </button>
              {props.showSavedMessage && (<span className="saved-msg">{(0, helpers_1.GetMessage)("generalSettings_settingsSaved")}</span>)}
            </div>
          </div>
        </formik_1.Form>)}
    </formik_1.Formik>);
};
exports.default = GeneralSettingsForm;
