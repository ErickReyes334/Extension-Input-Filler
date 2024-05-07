"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fake_filler_1 = __importDefault(require("src/common/fake-filler"));
function initialize(options, isProEdition) {
    let profileIndex = -1;
    const url = window.location.href;
    chrome.runtime.sendMessage({ type: "clearProfileBadge" }, () => chrome.runtime.lastError);
    if (isProEdition && url && options.profiles && options.profiles.length > 0) {
        for (let i = 0; i < options.profiles.length; i += 1) {
            const currentProfile = options.profiles[i];
            if (url.match(new RegExp(currentProfile.urlMatch))) {
                profileIndex = i;
                chrome.runtime.sendMessage({ type: "setProfileBadge", data: currentProfile }, () => chrome.runtime.lastError);
                break;
            }
        }
    }
    window.fakeFiller = new fake_filler_1.default(options, profileIndex);
}
function handleMessage(request) {
    switch (request.type) {
        case "receiveNewOptions": {
            const options = request.data.options;
            const isProEdition = request.data.isProEdition;
            initialize(options, isProEdition);
            return true;
        }
        default:
            return null;
    }
}
document.addEventListener("mousedown", (event) => {
    if (event.button === 2 && window.fakeFiller) {
        window.fakeFiller.setClickedElement(event.target);
    }
});
chrome.runtime.sendMessage({ type: "getOptions" }, (response) => {
    const options = response.options;
    const isProEdition = response.isProEdition;
    initialize(options, isProEdition);
});
chrome.runtime.onMessage.addListener(handleMessage);
