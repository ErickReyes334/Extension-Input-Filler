"use strict";
/* eslint-disable no-param-reassign */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cssesc_1 = __importDefault(require("cssesc"));
const moment_1 = __importDefault(require("moment"));
const randexp_1 = __importDefault(require("randexp"));
const data_generator_1 = __importDefault(require("src/common/data-generator"));
const helpers_1 = require("src/common/helpers");
class ElementFiller {
    constructor(options, profileIndex = -1) {
        this.options = options;
        this.profileIndex = profileIndex;
        this.generator = new data_generator_1.default();
        this.previousValue = "";
        this.previousPassword = "";
        this.previousUsername = "";
        this.previousFirstName = "";
        this.previousLastName = "";
    }
    fireEvents(element) {
        ["input", "click", "change", "blur"].forEach((event) => {
            const changeEvent = new Event(event, { bubbles: true, cancelable: true });
            element.dispatchEvent(changeEvent);
        });
    }
    isAnyMatch(haystack, needles) {
        for (let i = 0, count = needles.length; i < count; i += 1) {
            if (new RegExp(needles[i], "i").test(haystack)) {
                return true;
            }
        }
        return false;
    }
    isElementVisible(element) {
        if (!element.offsetHeight && !element.offsetWidth) {
            return false;
        }
        if (window.getComputedStyle(element).visibility === "hidden") {
            return false;
        }
        return true;
    }
    shouldIgnoreElement(element) {
        if (["button", "submit", "reset", "file", "hidden", "image"].indexOf(element.type) > -1) {
            return true;
        }
        // Ignore any invisible elements.
        if (this.options.ignoreHiddenFields && !this.isElementVisible(element)) {
            return true;
        }
        // Ignore any elements that match an item in the the "ignoredFields" array.
        const elementName = this.getElementName(element);
        if (this.isAnyMatch(elementName, this.options.ignoredFields)) {
            return true;
        }
        if (this.options.ignoreFieldsWithContent) {
            // A radio button list will be ignored if it has been selected previously.
            if (element.type === "radio") {
                if (document.querySelectorAll(`input[name="${element.name}"]:checked`).length > 0) {
                    return true;
                }
            }
            // All elements excluding radio buttons and check boxes will be ignored if they have a value.
            if (element.type !== "checkbox" && element.type !== "radio") {
                const elementValue = element.value;
                if (elementValue && elementValue.trim().length > 0) {
                    return true;
                }
            }
        }
        // If all above checks have failed, we do not need to ignore this element.
        return false;
    }
    selectRandomRadio(name, valuesList = []) {
        const list = [];
        const elements = document.getElementsByName(name);
        for (let i = 0; i < elements.length; i += 1) {
            if (elements[i].type === "radio" && (valuesList.length === 0 || valuesList.includes(elements[i].value))) {
                list.push(elements[i]);
            }
        }
        const radioElement = list[Math.floor(Math.random() * list.length)];
        radioElement.checked = true;
        this.fireEvents(radioElement);
    }
    findCustomFieldFromList(fields, elementName, matchTypes = []) {
        const doMatchType = matchTypes.length > 0;
        for (let i = 0; i < fields.length; i += 1) {
            if (this.isAnyMatch(elementName, fields[i].match)) {
                if (doMatchType) {
                    for (let j = 0; j < matchTypes.length; j += 1) {
                        if (fields[i].type === matchTypes[j]) {
                            return fields[i];
                        }
                    }
                }
                else {
                    return fields[i];
                }
            }
        }
        return undefined;
    }
    findCustomField(elementName, matchTypes = []) {
        let foundField;
        // Try finding the custom field from a profile if available.
        if (this.profileIndex > -1) {
            foundField = this.findCustomFieldFromList(this.options.profiles[this.profileIndex].fields, elementName, matchTypes);
        }
        // If a custom field could not be found from the profile, try getting one from the default list.
        if (!foundField) {
            foundField = this.findCustomFieldFromList(this.options.fields, elementName, matchTypes);
        }
        return foundField;
    }
    getElementName(element) {
        let normalizedName = "";
        if (this.options.fieldMatchSettings.matchName) {
            normalizedName += ` ${(0, helpers_1.SanitizeText)(element.name)}`;
        }
        if (this.options.fieldMatchSettings.matchId) {
            normalizedName += ` ${(0, helpers_1.SanitizeText)(element.id)}`;
        }
        if (this.options.fieldMatchSettings.matchClass) {
            normalizedName += ` ${(0, helpers_1.SanitizeText)(element.className)}`;
        }
        if (this.options.fieldMatchSettings.matchPlaceholder) {
            normalizedName += ` ${(0, helpers_1.SanitizeText)(element.getAttribute("placeholder") || "")}`;
        }
        if (this.options.fieldMatchSettings.matchLabel) {
            const normalizedId = (0, cssesc_1.default)(element.id);
            const labels = document.querySelectorAll(`label[for='${normalizedId}']`);
            for (let i = 0; i < labels.length; i += 1) {
                normalizedName += ` ${(0, helpers_1.SanitizeText)(labels[i].innerHTML)}`;
            }
        }
        if (this.options.fieldMatchSettings.matchAriaLabel) {
            normalizedName += ` ${(0, helpers_1.SanitizeText)(element.getAttribute("aria-label") || "")}`;
        }
        if (this.options.fieldMatchSettings.matchAriaLabelledBy) {
            const labelIds = (element.getAttribute("aria-labelledby") || "").split(" ");
            for (let i = 0; i < labelIds.length; i += 1) {
                const labelElement = document.getElementById(labelIds[i]);
                if (labelElement) {
                    normalizedName += ` ${(0, helpers_1.SanitizeText)(labelElement.innerHTML || "")}`;
                }
            }
        }
        return normalizedName;
    }
    getElementMaxLength(element) {
        if (element && element.maxLength && element.maxLength > 0) {
            return element.maxLength;
        }
        return this.options.defaultMaxLength;
    }
    generateDummyDataForCustomField(customField, element = undefined) {
        if (!customField) {
            return this.generator.phrase(this.getElementMaxLength(element));
        }
        switch (customField.type) {
            case "username": {
                this.previousUsername = this.generator.scrambledWord(5, 10).toLowerCase();
                return this.previousUsername;
            }
            case "first-name": {
                this.previousFirstName = this.generator.firstName();
                return this.previousFirstName;
            }
            case "last-name": {
                this.previousLastName = this.generator.lastName();
                return this.previousLastName;
            }
            case "full-name": {
                this.previousFirstName = this.generator.firstName();
                this.previousLastName = this.generator.lastName();
                return `${this.previousFirstName} ${this.previousLastName}`;
            }
            case "email": {
                let username = "";
                switch (customField.emailUsername) {
                    case "list": {
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        const usernames = customField.emailUsernameList || helpers_1.DEFAULT_EMAIL_CUSTOM_FIELD.emailUsernameList;
                        username = usernames[Math.floor(Math.random() * usernames.length)];
                        break;
                    }
                    case "username": {
                        if (this.previousUsername.length > 0) {
                            username = (0, helpers_1.SanitizeText)(this.previousUsername);
                        }
                        break;
                    }
                    case "name": {
                        if (this.previousFirstName.length > 0) {
                            username = (0, helpers_1.SanitizeText)(this.previousFirstName);
                        }
                        if (this.previousLastName.length > 0) {
                            if (username.length > 0) {
                                username += `.${(0, helpers_1.SanitizeText)(this.previousLastName)}`;
                            }
                            else {
                                username = (0, helpers_1.SanitizeText)(this.previousLastName);
                            }
                        }
                        break;
                    }
                    case "regex": {
                        try {
                            if (customField.emailUsernameRegEx) {
                                const regExGenerator = new randexp_1.default(customField.emailUsernameRegEx);
                                regExGenerator.defaultRange.add(0, 65535);
                                username = regExGenerator.gen();
                            }
                        }
                        catch (ex) {
                            // Do nothing.
                        }
                        break;
                    }
                    default:
                        break;
                }
                if (!username || username.length === 0) {
                    username = this.generator.scrambledWord(4, 10).toLowerCase();
                }
                let domain = "";
                if (customField.emailHostname === "list") {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    const hostnames = customField.emailHostnameList || helpers_1.DEFAULT_EMAIL_CUSTOM_FIELD.emailHostnameList;
                    const randomNumber = Math.floor(Math.random() * hostnames.length);
                    domain = hostnames[randomNumber];
                }
                if (!domain || domain.length === 0) {
                    domain = `${this.generator.scrambledWord().toLowerCase()}.com`;
                }
                if (domain.indexOf("@") === -1) {
                    domain = `@${domain}`;
                }
                let prefix = "";
                if (customField.emailPrefix) {
                    prefix = customField.emailPrefix;
                }
                return prefix + username + domain;
            }
            case "organization": {
                return this.generator.organizationName();
            }
            case "telephone": {
                return this.generator.phoneNumber(customField.template);
            }
            case "number": {
                const minValue = customField.min === 0 ? 0 : customField.min || 1;
                const maxValue = customField.max || 100;
                const decimalValue = customField.decimalPlaces || 0;
                return String(this.generator.randomNumber(minValue, maxValue, decimalValue));
            }
            case "date": {
                let minDate;
                let maxDate;
                if (customField.minDate) {
                    minDate = (0, moment_1.default)(customField.minDate).toDate();
                }
                else if (!Number.isNaN(Number(customField.min))) {
                    minDate = (0, moment_1.default)(new Date()).add(customField.min, "days").toDate();
                }
                if (customField.maxDate) {
                    maxDate = (0, moment_1.default)(customField.maxDate).toDate();
                }
                else if (!Number.isNaN(Number(customField.max))) {
                    maxDate = (0, moment_1.default)(new Date()).add(customField.max, "days").toDate();
                }
                if (element && element.type === "date") {
                    const dateElement = element;
                    if (dateElement.min && (0, moment_1.default)(dateElement.min).isValid()) {
                        minDate = (0, moment_1.default)(dateElement.min).toDate();
                    }
                    if (dateElement.max && (0, moment_1.default)(dateElement.max).isValid()) {
                        maxDate = (0, moment_1.default)(dateElement.max).toDate();
                    }
                    return this.generator.date(minDate, maxDate);
                }
                return (0, moment_1.default)(this.generator.date(minDate, maxDate)).format(customField.template);
            }
            case "url": {
                return this.generator.website();
            }
            case "text": {
                const minWords = customField.min || 10;
                const maxWords = customField.max || 30;
                let maxLength = customField.maxLength || this.options.defaultMaxLength;
                if (element && element.maxLength && element.maxLength < maxLength) {
                    maxLength = element.maxLength;
                }
                return this.generator.paragraph(minWords, maxWords, maxWords);
            }
            case "alphanumeric": {
                return this.generator.alphanumeric(customField.template || "");
            }
            case "regex": {
                const regExGenerator = new randexp_1.default(customField.template || "");
                regExGenerator.defaultRange.add(0, 65535);
                return regExGenerator.gen();
            }
            case "randomized-list": {
                if (customField.list && customField.list.length > 0) {
                    return customField.list[this.generator.randomNumber(0, customField.list.length - 1)];
                }
                return "";
            }
            default: {
                return this.generator.phrase(this.getElementMaxLength(element));
            }
        }
    }
    fillInputElement(element) {
        if (this.shouldIgnoreElement(element)) {
            return;
        }
        let fireEvent = true;
        const elementType = element.type ? element.type.toLowerCase() : "";
        switch (elementType) {
            case "checkbox": {
                if (this.isAnyMatch(element.name.toLowerCase(), this.options.agreeTermsFields)) {
                    element.checked = true;
                }
                else {
                    element.checked = Math.random() > 0.5;
                }
                break;
            }
            case "date": {
                const dateCustomField = this.findCustomField(this.getElementName(element), ["date"]);
                if (dateCustomField) {
                    element.value = this.generateDummyDataForCustomField(dateCustomField, element);
                }
                else {
                    let minDate;
                    let maxDate;
                    if (element.min) {
                        if ((0, moment_1.default)(element.min).isValid()) {
                            minDate = (0, moment_1.default)(element.min).toDate();
                        }
                    }
                    if (element.max) {
                        if ((0, moment_1.default)(element.max).isValid()) {
                            maxDate = (0, moment_1.default)(element.max).toDate();
                        }
                    }
                    element.value = this.generator.date(minDate, maxDate);
                }
                break;
            }
            case "datetime": {
                element.value = `${this.generator.date()}T${this.generator.time()}Z`;
                break;
            }
            case "datetime-local": {
                element.value = `${this.generator.date()}T${this.generator.time()}`;
                break;
            }
            case "time": {
                element.value = this.generator.time();
                break;
            }
            case "month": {
                element.value = `${this.generator.year()}-${this.generator.month()}`;
                break;
            }
            case "week":
                element.value = `${this.generator.year()}-W${this.generator.weekNumber()}`;
                break;
            case "email": {
                if (this.isAnyMatch(element.name.toLowerCase(), this.options.confirmFields)) {
                    element.value = this.previousValue;
                }
                else {
                    let emailCustomField = this.findCustomField(this.getElementName(element), ["email"]);
                    if (!emailCustomField) {
                        emailCustomField = helpers_1.DEFAULT_EMAIL_CUSTOM_FIELD;
                    }
                    this.previousValue = this.generateDummyDataForCustomField(emailCustomField, element);
                    element.value = this.previousValue;
                }
                break;
            }
            case "number":
            case "range": {
                let min = element.min ? parseInt(element.min, 10) : 1;
                let max = element.max ? parseInt(element.max, 10) : 100;
                const numberCustomField = this.findCustomField(this.getElementName(element), ["number"]);
                if (numberCustomField) {
                    min = numberCustomField.min || min;
                    max = numberCustomField.max || max;
                    if (element.min && element.max) {
                        min = Number(element.min) > min ? Number(element.min) : min;
                        max = Number(element.max) < max ? Number(element.max) : max;
                    }
                }
                element.value = String(this.generator.randomNumber(min, max));
                break;
            }
            case "password": {
                if (this.isAnyMatch(element.name.toLowerCase(), this.options.confirmFields)) {
                    element.value = this.previousPassword;
                }
                else {
                    if (this.options.passwordSettings.mode === "defined") {
                        this.previousPassword = this.options.passwordSettings.password;
                    }
                    else {
                        this.previousPassword = this.generator.scrambledWord(8, 8).toLowerCase();
                        // eslint-disable-next-line no-console
                        console.info(this.previousPassword);
                    }
                    element.value = this.previousPassword;
                }
                break;
            }
            case "radio": {
                if (element.name) {
                    const matchingCustomField = this.findCustomField(this.getElementName(element), ["randomized-list"]);
                    const valuesList = (matchingCustomField === null || matchingCustomField === void 0 ? void 0 : matchingCustomField.list) ? matchingCustomField === null || matchingCustomField === void 0 ? void 0 : matchingCustomField.list : [];
                    this.selectRandomRadio(element.name, valuesList);
                }
                fireEvent = false;
                break;
            }
            case "tel": {
                const telephoneCustomField = this.findCustomField(this.getElementName(element), [
                    "telephone",
                    "regex",
                    "randomized-list",
                ]);
                if (telephoneCustomField) {
                    element.value = this.generateDummyDataForCustomField(telephoneCustomField, element);
                }
                else {
                    element.value = this.generator.phoneNumber();
                }
                break;
            }
            case "url": {
                element.value = this.generator.website();
                break;
            }
            case "color": {
                element.value = this.generator.color();
                break;
            }
            case "search": {
                element.value = this.generator.words(1);
                break;
            }
            default: {
                if (this.isAnyMatch(element.name.toLowerCase(), this.options.confirmFields)) {
                    element.value = this.previousValue;
                }
                else {
                    const customField = this.findCustomField(this.getElementName(element));
                    this.previousValue = this.generateDummyDataForCustomField(customField, element);
                    element.value = this.previousValue;
                }
                break;
            }
        }
        if (this.options.triggerClickEvents && fireEvent) {
            this.fireEvents(element);
        }
    }
    fillTextAreaElement(element) {
        if (this.shouldIgnoreElement(element)) {
            return;
        }
        const matchingCustomField = this.findCustomField(this.getElementName(element), [
            "text",
            "alphanumeric",
            "regex",
            "randomized-list",
        ]);
        element.value = this.generateDummyDataForCustomField(matchingCustomField, element);
        if (this.options.triggerClickEvents) {
            this.fireEvents(element);
        }
    }
    fillSelectElement(element) {
        if (this.shouldIgnoreElement(element)) {
            return;
        }
        if (!element.options || element.options.length < 1) {
            return;
        }
        let valueExists = false;
        let valueSelected = false;
        const matchingCustomField = this.findCustomField(this.getElementName(element));
        // If a custom field exists for this element, we use that to determine the value.
        // However, if the generated value is not present in the options list we will select a random one.
        if (matchingCustomField) {
            const value = this.generateDummyDataForCustomField(matchingCustomField);
            for (let i = 0; i < element.options.length; i += 1) {
                if (element.options[i].value === value) {
                    element.options[i].selected = true;
                    valueExists = true;
                    valueSelected = true;
                    break;
                }
            }
        }
        if (!valueExists) {
            const optionsCount = element.options.length;
            const skipFirstOption = !!element.options[0].value === false;
            if (element.multiple) {
                // Unselect any existing options.
                for (let i = 0; i < optionsCount; i += 1) {
                    if (!element.options[i].disabled) {
                        element.options[i].selected = false;
                    }
                }
                // Select a random number of options.
                const numberOfOptionsToSelect = this.generator.randomNumber(1, optionsCount);
                for (let i = 0; i < numberOfOptionsToSelect; i += 1) {
                    if (!element.options[i].disabled) {
                        element.options[this.generator.randomNumber(1, optionsCount - 1)].selected = true;
                        valueSelected = true;
                    }
                }
            }
            else {
                // Select a random option as long as it is not disabled.
                // If it is disabled, continue finding a random option that can be selected.
                let iterations = 0;
                while (iterations < optionsCount) {
                    const randomOptionIndex = this.generator.randomNumber(skipFirstOption ? 1 : 0, optionsCount - 1);
                    if (!element.options[randomOptionIndex].disabled) {
                        element.options[randomOptionIndex].selected = true;
                        valueSelected = true;
                        break;
                    }
                    else {
                        iterations += 1;
                    }
                }
            }
        }
        if (valueSelected && this.options.triggerClickEvents) {
            this.fireEvents(element);
        }
    }
    fillContentEditableElement(element) {
        if (element.isContentEditable) {
            element.textContent = this.generator.paragraph(5, 100, this.options.defaultMaxLength);
        }
    }
}
exports.default = ElementFiller;
