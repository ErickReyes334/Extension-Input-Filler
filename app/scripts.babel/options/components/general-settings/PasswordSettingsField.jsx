import React from 'react';
import { Field } from 'redux-form';

import toggleInput from '../shared/ToggleInput';
import language from '../../../form-filler/language'
const PasswordSettingsField = (fields) => {
  const modeField = fields.passwordSettings.mode;
  const passwordField = fields.passwordSettings.password;

  const fieldHasError = modeField.meta.invalid || passwordField.meta.invalid;

  return (
    <div className={`form-group${(fieldHasError) ? ' has-error' : ''}`}>
      <label className="control-label col-sm-3">{language("password")}</label>
      <div className="col-sm-9">
        <Field
          {...modeField.input}
          component={toggleInput}
          type="radio"
          value="random"
          label={language("randomPassword")}
        />
        <Field
          {...modeField.input}
          component={toggleInput}
          type="radio"
          value="defined"
          label={language("useThis")}
        />
        <Field
          {...passwordField.input}
          type="text"
          component="input"
          className="form-control"
          autoComplete="off"
        />
        {
          passwordField.meta.error &&
          <div className="help-block">{passwordField.meta.error}</div>
        }
      </div>
    </div>
  );
};

export default PasswordSettingsField;
