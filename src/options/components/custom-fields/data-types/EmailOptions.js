"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const element_filler_1 = __importDefault(require("src/common/element-filler"));
const helpers_1 = require("src/common/helpers");
const RadioButtonField_1 = __importDefault(require("src/options/components/common/RadioButtonField"));
const TextField_1 = __importDefault(require("src/options/components/common/TextField"));
const options = (0, helpers_1.FakeFillerDefaultOptions)();
options.fields = [];
options.fields.push(Object.assign({}, helpers_1.DEFAULT_EMAIL_CUSTOM_FIELD));
options.fields.push({
    type: "username",
    name: "Username",
    match: ["user"],
});
options.fields.push({
    type: "full-name",
    name: "Full Name",
    match: ["name"],
});
const EmailOptions = (props) => {
    const { emailPrefix, emailHostname, emailHostnameList, emailUsername, emailUsernameList, emailUsernameRegEx } = props;
    function generateRandomEmail() {
        options.fields[0].emailPrefix = emailPrefix;
        options.fields[0].emailHostname = emailHostname;
        options.fields[0].emailHostnameList = (0, helpers_1.CsvToArray)(emailHostnameList);
        options.fields[0].emailUsername = emailUsername;
        options.fields[0].emailUsernameList = (0, helpers_1.CsvToArray)(emailUsernameList);
        options.fields[0].emailUsernameRegEx = emailUsernameRegEx;
        const elementFiller = new element_filler_1.default(options);
        const element = document.getElementById("email");
        if (options.fields[0].emailUsername === "username") {
            element.setAttribute("id", "user");
            element.setAttribute("type", "text");
            element.setAttribute("name", "user");
            elementFiller.fillInputElement(element);
            element.value = "";
        }
        if (options.fields[0].emailUsername === "name") {
            element.setAttribute("id", "name");
            element.setAttribute("type", "text");
            element.setAttribute("name", "name");
            elementFiller.fillInputElement(element);
            element.value = "";
        }
        element.setAttribute("id", "email");
        element.setAttribute("type", "email");
        element.setAttribute("name", "email");
        elementFiller.fillInputElement(element);
    }
    return (<div>
      <div className="form-group row">
        <label className="col-sm-3 col-form-label text-sm-right" htmlFor="emailPrefix">
          {(0, helpers_1.GetMessage)("customFields_label_emailUsernamePrefix")}
        </label>
        <div className="col-sm-9">
          <TextField_1.default name="emailPrefix"/>
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-3 col-form-label text-sm-right pt-0" htmlFor="emailUsername">
          {(0, helpers_1.GetMessage)("customFields_label_username")}
        </label>
        <div className="col-sm-9">
          <RadioButtonField_1.default name="emailUsername" value="username" label={(0, helpers_1.GetMessage)("customFields_label_username_usernameLabel")}/>
          <RadioButtonField_1.default name="emailUsername" value="name" label={(0, helpers_1.GetMessage)("customFields_label_username_nameLabel")}/>
          <RadioButtonField_1.default name="emailUsername" value="random" label={(0, helpers_1.GetMessage)("customFields_label_username_randomLabel")}/>
          <RadioButtonField_1.default name="emailUsername" value="list" label={(0, helpers_1.GetMessage)("customFields_label_username_listLabel")}/>
          <TextField_1.default name="emailUsernameList" placeholder={(0, helpers_1.GetMessage)("enterCsv")}/>
          <RadioButtonField_1.default name="emailUsername" value="regex" label={(0, helpers_1.GetMessage)("customFields_label_username_regExTextPlaceholder")}/>
          <TextField_1.default name="emailUsernameRegEx" placeholder={(0, helpers_1.GetMessage)("enterCsv")}/>
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-3 col-form-label text-sm-right pt-0" htmlFor="emailHostname">
          {(0, helpers_1.GetMessage)("customFields_label_hostName")}
        </label>
        <div className="col-sm-9">
          <RadioButtonField_1.default name="emailHostname" value="random" label={(0, helpers_1.GetMessage)("customFields_label_hostName_randomLabel")}/>
          <RadioButtonField_1.default name="emailHostname" value="list" label={(0, helpers_1.GetMessage)("customFields_label_hostName_listLabel")}/>
          <TextField_1.default name="emailHostnameList" placeholder={(0, helpers_1.GetMessage)("enterCsv")} helpText={(0, helpers_1.GetMessage)("customFields_label_hostName_listTextHelp")}/>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-3">&nbsp;</div>
        <div className="col-sm-9">
          <div className="row no-gutters align-items-center">
            <div className="col-auto">
              <button type="button" className="btn btn-sm btn-outline-primary mr-2" onClick={generateRandomEmail}>
                {(0, helpers_1.GetMessage)("testMe")}
              </button>
            </div>
            <div className="col">
              <input id="email" type="email" name="email" className="form-control form-control-sm" tabIndex={-1} readOnly style={{ backgroundColor: "white", border: "none", cursor: "default", outline: "none" }}/>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
exports.default = EmailOptions;
