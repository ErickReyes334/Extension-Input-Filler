"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const helpers_1 = require("src/common/helpers");
const HtmlPhrase_1 = __importDefault(require("src/options/components/common/HtmlPhrase"));
const TextField_1 = __importDefault(require("src/options/components/common/TextField"));
const DateOptions = () => {
    const dateTypeHelpText = <HtmlPhrase_1.default phrase={(0, helpers_1.GetMessage)("customFields_dateTypeHelp")}/>;
    return (<>
      <div className="form-group row">
        <label className="col-sm-3 col-form-label text-sm-right" htmlFor="dateMin">
          {(0, helpers_1.GetMessage)("customFields_label_minDate")}
        </label>
        <div className="col-sm-9">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">{(0, helpers_1.GetMessage)("customFields_label_datePrependText")}</span>
            </div>
            <TextField_1.default name="dateMin" type="number" min={-999999} max={999999}/>
            <div className="input-group-append">
              <span className="input-group-text">{(0, helpers_1.GetMessage)("customFields_label_dateAppendText")}</span>
            </div>
            <TextField_1.default name="dateMinDate" type="date"/>
          </div>
          <small className="form-text text-muted">{(0, helpers_1.GetMessage)("customFields_label_date_helpText")}</small>
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-3 col-form-label text-sm-right" htmlFor="dateMax">
          {(0, helpers_1.GetMessage)("customFields_label_maxDate")}
        </label>
        <div className="col-sm-9">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">{(0, helpers_1.GetMessage)("customFields_label_datePrependText")}</span>
            </div>
            <TextField_1.default name="dateMax" type="number" min={-999999} max={999999}/>
            <div className="input-group-append">
              <span className="input-group-text">{(0, helpers_1.GetMessage)("customFields_label_dateAppendText")}</span>
            </div>
            <TextField_1.default name="dateMaxDate" type="date"/>
          </div>
          <small className="form-text text-muted">{(0, helpers_1.GetMessage)("customFields_label_date_helpText")}</small>
        </div>
      </div>
      <TextField_1.default name="dateTemplate" label={(0, helpers_1.GetMessage)("customFields_label_template")} helpText={dateTypeHelpText}/>
    </>);
};
exports.default = DateOptions;
