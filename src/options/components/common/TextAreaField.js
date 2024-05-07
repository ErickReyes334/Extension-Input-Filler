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
const TextAreaField = react_1.default.forwardRef((props, ref) => {
    const [field, meta] = (0, formik_1.useField)(props);
    const { name, id, label, helpText, className } = props, rest = __rest(props, ["name", "id", "label", "helpText", "className"]);
    let controlCssClass = "form-control";
    if (meta.touched) {
        if (meta.error) {
            controlCssClass += " is-invalid";
        }
    }
    if (className) {
        controlCssClass += ` ${className}`;
    }
    const controlMarkup = (<>
      <textarea id={id || name} ref={ref} className={controlCssClass} {...field} {...rest}/>
      {helpText && <small className="form-text text-muted">{helpText}</small>}
      {meta.touched && meta.error ? <div className="invalid-feedback">{meta.error}</div> : null}
    </>);
    if (label) {
        return (<div className="form-group row">
        <label htmlFor={id || name} className="col-sm-3 col-form-label text-sm-right">
          {label}
        </label>
        <div className="col-sm-9">{controlMarkup}</div>
      </div>);
    }
    return controlMarkup;
});
exports.default = TextAreaField;
