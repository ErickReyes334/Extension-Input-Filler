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
Object.defineProperty(exports, "__esModule", { value: true });
const formik_1 = require("formik");
const React = __importStar(require("react"));
const helpers_1 = require("src/common/helpers");
const DataTypeSelectField = () => {
    const form = (0, formik_1.useFormikContext)();
    function handleSelectChange(event) {
        form.handleChange(event);
        const value = event.target.value;
        switch (value) {
            case "telephone":
                if (!form.values.telephoneTemplate) {
                    form.setFieldValue("telephoneTemplate", "+1 (XxX) XxX-XxxX");
                }
                break;
            case "number":
                if (!form.values.numberMin && !form.values.numberMax) {
                    form.setFieldValue("numberMin", 0);
                    form.setFieldValue("numberMax", 99999);
                    form.setFieldValue("numberDecimalPlaces", 0);
                }
                break;
            case "date":
                if (!form.values.dateTemplate) {
                    form.setFieldValue("dateTemplate", "DD-MMM-YYYY");
                }
                if (!form.values.dateMin && !form.values.dateMinDate) {
                    form.setFieldValue("dateMin", "");
                    form.setFieldValue("dateMinDate", "1970-01-01");
                }
                if (!form.values.dateMax && !form.values.dateMaxDate) {
                    form.setFieldValue("dateMax", 0);
                    form.setFieldValue("dateMaxDate", "");
                }
                break;
            case "text":
                if (!form.values.textMin && !form.values.textMax) {
                    form.setFieldValue("textMin", 1);
                    form.setFieldValue("textMax", 20);
                    form.setFieldValue("textMaxLength", 50);
                }
                break;
            default:
                break;
        }
    }
    return (<div className="form-group row">
      <label className="col-sm-3 col-form-label text-sm-right" htmlFor="type">
        {(0, helpers_1.GetMessage)("customFields_label_dataType")}
      </label>
      <div className="col-sm-9">
        <formik_1.Field name="type">
          {(fieldProps) => {
            let className = "custom-select";
            if (fieldProps.meta.touched) {
                if (fieldProps.meta.error) {
                    className += " is-invalid";
                }
            }
            return (<select {...fieldProps.field} onChange={handleSelectChange} className={className}>
                <option value="">{(0, helpers_1.GetMessage)("customFields_dataType_select")}</option>
                <optgroup label={(0, helpers_1.GetMessage)("customFields_dataType_humanDataLabel")}>
                  <option value="first-name">{(0, helpers_1.GetMessage)("customFields_dataType_firstName")}</option>
                  <option value="last-name">{(0, helpers_1.GetMessage)("customFields_dataType_lastName")}</option>
                  <option value="full-name">{(0, helpers_1.GetMessage)("customFields_dataType_fullName")}</option>
                  <option value="username">{(0, helpers_1.GetMessage)("customFields_dataType_username")}</option>
                  <option value="email">{(0, helpers_1.GetMessage)("customFields_dataType_emailAddress")}</option>
                  <option value="organization">{(0, helpers_1.GetMessage)("customFields_dataType_companyName")}</option>
                  <option value="telephone">{(0, helpers_1.GetMessage)("customFields_dataType_telephone")}</option>
                  <option value="number">{(0, helpers_1.GetMessage)("customFields_dataType_number")}</option>
                  <option value="date">{(0, helpers_1.GetMessage)("customFields_dataType_date")}</option>
                  <option value="url">{(0, helpers_1.GetMessage)("customFields_dataType_url")}</option>
                </optgroup>
                <optgroup label={(0, helpers_1.GetMessage)("customFields_dataType_otherLabel")}>
                  <option value="text">{(0, helpers_1.GetMessage)("customFields_dataType_text")}</option>
                  <option value="alphanumeric">{(0, helpers_1.GetMessage)("customFields_dataType_alphaNumeric")}</option>
                  <option value="regex">{(0, helpers_1.GetMessage)("customFields_dataType_regEx")}</option>
                  <option value="randomized-list">{(0, helpers_1.GetMessage)("customFields_dataType_randomizedList")}</option>
                </optgroup>
              </select>);
        }}
        </formik_1.Field>
        <formik_1.ErrorMessage name="type">
          {(errorMessage) => <div className="invalid-feedback">{errorMessage}</div>}
        </formik_1.ErrorMessage>
      </div>
    </div>);
};
exports.default = DataTypeSelectField;
