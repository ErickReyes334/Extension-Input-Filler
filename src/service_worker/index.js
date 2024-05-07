"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function getCurrentTabId() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        let tab;
        let queryOptions = { active: true, lastFocusedWindow: true };
        // `tab` will either be a `tabs.Tab` instance or `undefined`.
        [tab] = yield chrome.tabs.query(queryOptions);
        return (_a = tab === null || tab === void 0 ? void 0 : tab.id) !== null && _a !== void 0 ? _a : -1;
    });
}
const helpers_1 = require("src/common/helpers");
function NotifyTabsOfNewOptions(options) {
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            if (tab && tab.id && tab.id !== chrome.tabs.TAB_ID_NONE) {
                chrome.tabs.sendMessage(tab.id, { type: "receiveNewOptions", data: { options } }, () => chrome.runtime.lastError);
            }
        });
    });
}
function handleMessage(request, sender, sendResponse) {
    var _a, _b, _c, _d;
    switch (request.type) {
        case "getOptions": {
            (0, helpers_1.GetFakeFillerOptions)().then((result) => {
                sendResponse({ options: result });
            });
            return true;
        }
        case "setProfileBadge": {
            const profile = request.data;
            chrome.action.setBadgeText({ text: "★", tabId: (_a = sender.tab) === null || _a === void 0 ? void 0 : _a.id });
            chrome.action.setBadgeBackgroundColor({ color: "#757575", tabId: (_b = sender.tab) === null || _b === void 0 ? void 0 : _b.id });
            chrome.action.setTitle({
                title: `${(0, helpers_1.GetMessage)("actionTitle")}\n${(0, helpers_1.GetMessage)("matchedProfile")}: ${profile.name}`,
                tabId: (_c = sender.tab) === null || _c === void 0 ? void 0 : _c.id,
            });
            return true;
        }
        case "clearProfileBadge": {
            chrome.action.setBadgeText({ text: "", tabId: (_d = sender.tab) === null || _d === void 0 ? void 0 : _d.id });
            return true;
        }
        case "optionsUpdated": {
            (0, helpers_1.GetFakeFillerOptions)().then((options) => {
                NotifyTabsOfNewOptions(options);
            });
            return true;
        }
        default:
            return null;
    }
}
if (chrome.runtime.onInstalled) {
    chrome.runtime.onInstalled.addListener((details) => {
        if (details.reason === "update") {
            try {
                if (details.previousVersion && details.previousVersion.startsWith("3.2")) {
                    (0, helpers_1.GetFakeFillerOptions)().then((options) => {
                        options.fieldMatchSettings.matchAriaLabelledBy = true;
                        (0, helpers_1.SaveFakeFillerOptions)(options);
                    });
                }
            }
            catch (ex) {
                // eslint-disable-next-line no-alert
                window.alert((0, helpers_1.GetMessage)("bgPage_errorMigratingOptions", [ex.message]));
            }
        }
    });
}
chrome.runtime.onMessage.addListener(handleMessage);
function fillAllInputs() {
    window.fakeFiller && window.fakeFiller.fillAllInputs();
}
function fillThisForm() {
    window.fakeFiller.fillThisForm();
}
function fillThisInput() {
    window.fakeFiller.fillThisInput();
}
chrome.action.onClicked.addListener(() => __awaiter(void 0, void 0, void 0, function* () {
    yield chrome.scripting.executeScript({
        func: fillAllInputs,
        target: {
            allFrames: true,
            tabId: yield getCurrentTabId()
        }
    });
}));
(0, helpers_1.GetFakeFillerOptions)().then((options) => {
    (0, helpers_1.CreateContextMenus)(options.enableContextMenu);
});
chrome.contextMenus.onClicked.addListener((info) => __awaiter(void 0, void 0, void 0, function* () {
    if (info.menuItemId === "fake-filler-all") {
        yield chrome.scripting.executeScript({
            func: fillAllInputs,
            target: {
                allFrames: true,
                tabId: yield getCurrentTabId()
            },
        });
    }
    if (info.menuItemId === "fake-filler-form") {
        yield chrome.scripting.executeScript({
            func: fillThisForm,
            target: {
                allFrames: true,
                tabId: yield getCurrentTabId()
            },
        });
    }
    if (info.menuItemId === "fake-filler-input") {
        yield chrome.scripting.executeScript({
            func: fillThisInput,
            target: {
                allFrames: true,
                tabId: yield getCurrentTabId()
            },
        });
    }
}));
chrome.commands.onCommand.addListener((command) => __awaiter(void 0, void 0, void 0, function* () {
    if (command === "fill_all_inputs") {
        yield chrome.scripting.executeScript({
            func: fillAllInputs,
            target: {
                allFrames: true,
                tabId: yield getCurrentTabId()
            },
        });
    }
    if (command === "fill_this_form") {
        yield chrome.scripting.executeScript({
            func: fillThisForm,
            target: {
                allFrames: true,
                tabId: yield getCurrentTabId()
            },
        });
    }
    if (command === "fill_this_input") {
        yield chrome.scripting.executeScript({
            func: fillThisInput,
            target: {
                allFrames: true,
                tabId: yield getCurrentTabId()
            },
        });
    }
}));
