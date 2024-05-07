"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formik_1 = require("formik");
const react_1 = __importDefault(require("react"));
const CheckboxField = react_1.default.forwardRef((props, ref) => {
    const [field, meta] = (0, formik_1.useField)(Object.assign(Object.assign({}, props), { type: "checkbox" }));
    const { name, id, label, helpText, className, title } = props, rest = __rest(props, ["name", "id", "label", "helpText", "className", "title"]);
    let validationCssClass = "";
    if (meta.touched) {
        if (meta.error) {
            validationCssClass = "is-invalid";
        }
    }
    const componentId = id || name;
    const controlMarkup = (<div className={`custom-control custom-switch ${className}`}>
      <input id={componentId} type="checkbox" ref={ref} className={`custom-control-input ${validationCssClass}`} {...field} {...rest}/>
      <label htmlFor={componentId} className="custom-control-label">
        {label}
      </label>
      {helpText && <small className="form-text text-muted">{helpText}</small>}
      {meta.touched && meta.error ? <div className="invalid-feedback">{meta.error}</div> : null}
    </div>);
    if (title) {
        return (<div className="form-group row">
        <div className="col-sm-3 text-sm-right">{title}</div>
        <div className="col-sm-9">{controlMarkup}</div>
      </div>);
    }
    return controlMarkup;
});
exports.default = CheckboxField;
