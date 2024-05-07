"use strict";
/* eslint-disable no-param-reassign */
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveProfile = exports.createProfile = exports.deleteProfile = exports.getKeyboardShortcuts = exports.saveCustomField = exports.createCustomField = exports.saveSortedCustomFields = exports.deleteCustomField = exports.saveOptions = exports.getOptions = exports.updateAuthState = void 0;
const immer_1 = require("immer");
const helpers_1 = require("src/common/helpers");
function updateAuthState(user, claims) {
    return { type: "UPDATE_AUTH_STATE", user, claims };
}
exports.updateAuthState = updateAuthState;
function getOptions() {
    return (dispatch) => {
        dispatch({ type: "FETCHING_OPTIONS" });
        return (0, helpers_1.GetFakeFillerOptions)().then((options) => {
            dispatch({ type: "RECEIVED_OPTIONS", options });
            return Promise.resolve();
        });
    };
}
exports.getOptions = getOptions;
// export function resetOptions(): MyDefaultThunkResult {
//   return (dispatch) => {
//     const options = FakeFillerDefaultOptions();
//     SaveFakeFillerOptions(options);
//     dispatch({ type: "RECEIVED_OPTIONS", options });
//     return Promise.resolve();
//   };
// }
function saveOptions(options, formValues) {
    return (dispatch) => {
        const updatedOptions = (0, immer_1.produce)(options, (draft) => {
            if (formValues) {
                draft.agreeTermsFields = (0, helpers_1.CsvToArray)(formValues.agreeTermsFields);
                draft.confirmFields = (0, helpers_1.CsvToArray)(formValues.confirmFields);
                draft.defaultMaxLength = parseInt(formValues.defaultMaxLength, 10);
                draft.enableContextMenu = formValues.enableContextMenu;
                draft.ignoreFieldsWithContent = formValues.ignoreFieldsWithContent;
                draft.ignoreHiddenFields = formValues.ignoreHiddenFields;
                draft.ignoredFields = (0, helpers_1.CsvToArray)(formValues.ignoredFields);
                draft.triggerClickEvents = formValues.triggerClickEvents;
                draft.passwordSettings = {
                    mode: formValues.passwordSettingsMode,
                    password: formValues.passwordSettingsPassword,
                };
                draft.fieldMatchSettings = {
                    matchClass: formValues.fieldMatchClass,
                    matchId: formValues.fieldMatchId,
                    matchLabel: formValues.fieldMatchLabel,
                    matchAriaLabel: formValues.fieldMatchAriaLabel,
                    matchAriaLabelledBy: formValues.fieldMatchAriaLabelledBy,
                    matchName: formValues.fieldMatchName,
                    matchPlaceholder: formValues.fieldMatchPlaceholder,
                };
            }
            return draft;
        });
        (0, helpers_1.SaveFakeFillerOptions)(updatedOptions);
        dispatch({ type: "RECEIVED_OPTIONS", options: updatedOptions });
        return Promise.resolve();
    };
}
exports.saveOptions = saveOptions;
function deleteCustomField(index, profileIndex) {
    return (dispatch, getState) => {
        const state = getState();
        const options = state.optionsData.options;
        const updatedOptions = (0, immer_1.produce)(options, (draft) => {
            if (profileIndex < 0) {
                draft.fields.splice(index, 1);
            }
            else {
                draft.profiles[profileIndex].fields.splice(index, 1);
            }
            return draft;
        });
        (0, helpers_1.SaveFakeFillerOptions)(updatedOptions);
        dispatch({ type: "RECEIVED_OPTIONS", options: updatedOptions });
        return Promise.resolve();
    };
}
exports.deleteCustomField = deleteCustomField;
function saveSortedCustomFields(customFields, profileIndex) {
    return (dispatch, getState) => {
        const state = getState();
        const options = state.optionsData.options;
        const updatedOptions = (0, immer_1.produce)(options, (draft) => {
            if (profileIndex < 0) {
                draft.fields = customFields;
            }
            else {
                draft.profiles[profileIndex].fields = customFields;
            }
            return draft;
        });
        (0, helpers_1.SaveFakeFillerOptions)(updatedOptions);
        dispatch({ type: "RECEIVED_OPTIONS", options: updatedOptions });
        return Promise.resolve();
    };
}
exports.saveSortedCustomFields = saveSortedCustomFields;
function createCustomFieldFromFormData(formData) {
    const customField = {
        match: (0, helpers_1.CsvToArray)(formData.match),
        name: formData.name.trim(),
        type: formData.type,
    };
    if (customField.type === "number") {
        customField.min = parseInt(formData.numberMin, 10);
        customField.max = parseInt(formData.numberMax, 10);
        customField.decimalPlaces = parseInt(formData.numberDecimalPlaces, 10);
    }
    if (customField.type === "text") {
        customField.min = parseInt(formData.textMin, 10);
        customField.max = parseInt(formData.textMax, 10);
        customField.maxLength = parseInt(formData.textMaxLength, 10);
    }
    if (customField.type === "telephone") {
        customField.template = formData.telephoneTemplate.trim();
    }
    if (customField.type === "date") {
        customField.template = formData.dateTemplate.trim();
        const min = parseInt(formData.dateMin, 10);
        const max = parseInt(formData.dateMax, 10);
        if (!Number.isNaN(min)) {
            customField.min = min;
        }
        if (!Number.isNaN(max)) {
            customField.max = max;
        }
        if (formData.dateMinDate) {
            customField.minDate = formData.dateMinDate.trim();
        }
        if (formData.dateMaxDate) {
            customField.maxDate = formData.dateMaxDate.trim();
        }
    }
    if (customField.type === "alphanumeric") {
        customField.template = formData.alphanumericTemplate.trim();
    }
    if (customField.type === "regex") {
        customField.template = formData.regexTemplate.trim();
    }
    if (customField.type === "randomized-list") {
        customField.list = formData.list ? (0, helpers_1.MultipleLinesToArray)(formData.list) : undefined;
    }
    if (customField.type === "email") {
        customField.emailPrefix = formData.emailPrefix.trim();
        customField.emailHostname = formData.emailHostname;
        customField.emailHostnameList = (0, helpers_1.CsvToArray)(formData.emailHostnameList);
        customField.emailUsername = formData.emailUsername;
        customField.emailUsernameList = (0, helpers_1.CsvToArray)(formData.emailUsernameList);
        customField.emailUsernameRegEx = formData.emailUsernameRegEx.trim();
    }
    return customField;
}
function createCustomField(customField, customFieldIndex, profileIndex) {
    return (dispatch, getState) => {
        const state = getState();
        const options = state.optionsData.options;
        const updatedOptions = (0, immer_1.produce)(options, (draft) => {
            const newCustomField = createCustomFieldFromFormData(customField);
            if (profileIndex < 0) {
                draft.fields.splice(customFieldIndex, 0, newCustomField);
            }
            else {
                draft.profiles[profileIndex].fields.splice(customFieldIndex, 0, newCustomField);
            }
            return draft;
        });
        (0, helpers_1.SaveFakeFillerOptions)(updatedOptions);
        dispatch({ type: "RECEIVED_OPTIONS", options: updatedOptions });
        return Promise.resolve();
    };
}
exports.createCustomField = createCustomField;
function saveCustomField(customField, customFieldIndex, profileIndex) {
    return (dispatch, getState) => {
        const state = getState();
        const options = state.optionsData.options;
        const updatedOptions = (0, immer_1.produce)(options, (draft) => {
            const newCustomField = createCustomFieldFromFormData(customField);
            if (profileIndex < 0) {
                draft.fields[customFieldIndex] = newCustomField;
            }
            else {
                draft.profiles[profileIndex].fields[customFieldIndex] = newCustomField;
            }
            return draft;
        });
        (0, helpers_1.SaveFakeFillerOptions)(updatedOptions);
        dispatch({ type: "RECEIVED_OPTIONS", options: updatedOptions });
        return Promise.resolve();
    };
}
exports.saveCustomField = saveCustomField;
function getKeyboardShortcuts() {
    return (dispatch) => {
        dispatch({ type: "FETCHING_KEYBOARD_SHORTCUTS" });
        return (0, helpers_1.GetKeyboardShortcuts)().then((shortcuts) => {
            dispatch({ type: "RECEIVED_KEYBOARD_SHORTCUTS", shortcuts });
            return Promise.resolve();
        });
    };
}
exports.getKeyboardShortcuts = getKeyboardShortcuts;
function deleteProfile(profileIndex) {
    return (dispatch, getState) => {
        const state = getState();
        const options = state.optionsData.options;
        const updatedOptions = (0, immer_1.produce)(options, (draft) => {
            if (profileIndex >= 0) {
                draft.profiles.splice(profileIndex, 1);
            }
            return draft;
        });
        (0, helpers_1.SaveFakeFillerOptions)(updatedOptions);
        dispatch({ type: "RECEIVED_OPTIONS", options: updatedOptions });
        return Promise.resolve();
    };
}
exports.deleteProfile = deleteProfile;
function createProfileFromFormData(formData) {
    const profile = {
        name: formData.name.trim(),
        urlMatch: formData.urlMatch,
        fields: [],
    };
    return profile;
}
function createProfile(profile) {
    return (dispatch, getState) => {
        const state = getState();
        const options = state.optionsData.options;
        const updatedOptions = (0, immer_1.produce)(options, (draft) => {
            draft.profiles.push(createProfileFromFormData(profile));
            return draft;
        });
        (0, helpers_1.SaveFakeFillerOptions)(updatedOptions);
        dispatch({ type: "RECEIVED_OPTIONS", options: updatedOptions });
        return Promise.resolve();
    };
}
exports.createProfile = createProfile;
function saveProfile(profile, profileIndex) {
    return (dispatch, getState) => {
        const state = getState();
        const options = state.optionsData.options;
        const updatedOptions = (0, immer_1.produce)(options, (draft) => {
            draft.profiles[profileIndex].name = profile.name;
            draft.profiles[profileIndex].urlMatch = profile.urlMatch;
            return draft;
        });
        (0, helpers_1.SaveFakeFillerOptions)(updatedOptions);
        dispatch({ type: "RECEIVED_OPTIONS", options: updatedOptions });
        return Promise.resolve();
    };
}
exports.saveProfile = saveProfile;
