"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formik_1 = require("formik");
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const firebase_1 = require("src/common/firebase");
const helpers_1 = require("src/common/helpers");
const ExternalLink_1 = __importDefault(require("src/options/components/common/ExternalLink"));
const TextField_1 = __importDefault(require("src/options/components/common/TextField"));
const validate = (values) => {
    const errors = {};
    if (!values.emailAddress || values.emailAddress.trim().length === 0) {
        errors.emailAddress = "Please enter your email address.";
    }
    if (!values.password) {
        errors.password = "Please enter your password.";
    }
    return errors;
};
const LoginPage = () => {
    const history = (0, react_router_dom_1.useHistory)();
    const isLoggedIn = (0, react_redux_1.useSelector)((state) => !!state.authData.user);
    const initialValues = {
        emailAddress: "",
        password: "",
    };
    function handleSubmit(values, helpers) {
        helpers.setSubmitting(true);
        (0, firebase_1.login)(values.emailAddress, values.password)
            .then((user) => {
            if (!user) {
                helpers.setFieldError("emailAddress", (0, helpers_1.GetMessage)("account_error_errorFetchingAccount"));
            }
            else {
                history.push("/account");
            }
        })
            .catch((error) => {
            if (error.code === "auth/user-not-found") {
                helpers.setFieldError("emailAddress", (0, helpers_1.GetMessage)("account_error_noAccount"));
            }
            else if (error.code === "auth/wrong-password") {
                helpers.setFieldError("password", (0, helpers_1.GetMessage)("account_error_incorrectPassword"));
            }
            else {
                helpers.setFieldError("emailAddress", `${(0, helpers_1.GetMessage)("account_error_unknownLoginError")} (${error.code})`);
            }
            helpers.setSubmitting(false);
        });
    }
    if (isLoggedIn) {
        return <react_router_dom_1.Redirect to="/account"/>;
    }
    return (<>
      <h2>Login to your account</h2>
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <p>Enter your email address and password below to activate Fake Filler Pro.</p>
          <p>
            Logging in will enable Settings Sync. Your data is never used for anything other than Sync. For more
            information, please refer to our{" "}
            <ExternalLink_1.default url="https://fakefiller.com/privacy">privacy policy</ExternalLink_1.default>.
          </p>
          <formik_1.Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
            {({ isSubmitting, isValid }) => (<formik_1.Form>
                <div className="form-group">
                  <TextField_1.default name="emailAddress" placeholder={(0, helpers_1.GetMessage)("account_emailAddress")} type="email"/>
                </div>
                <div className="form-group">
                  <TextField_1.default name="password" placeholder={(0, helpers_1.GetMessage)("account_password")} type="password"/>
                </div>
                <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting || !isValid}>
                  {(0, helpers_1.GetMessage)("account_login")}
                </button>
              </formik_1.Form>)}
          </formik_1.Formik>
        </div>
        <div className="col-lg-7 offset-lg-1 col-md-6">
          <div className="bg-light p-3 rounded mt-4 mt-md-0">
            <p>
              <b>Don’t have an account?</b>
            </p>
            <p>Subscribe to Fake Filler Pro to unlock these features:</p>
            <ul>
              <li>Unlimited custom fields</li>
              <li>Synchronize settings across all your browsers</li>
              <li>Create URL-specific custom fields (multiple profiles)</li>
            </ul>
            <p>
              <a href="https://fakefiller.com/#pricing" className="btn btn-primary">
                Subscribe Now
              </a>
            </p>
          </div>
        </div>
      </div>
    </>);
};
exports.default = LoginPage;
