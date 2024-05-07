"use strict";
/* eslint-disable no-param-reassign */
Object.defineProperty(exports, "__esModule", { value: true });
const immer_1 = require("immer");
const redux_1 = require("redux");
const optionsInitialState = {
    isFetching: false,
    options: null,
};
const OptionsReducer = (state = optionsInitialState, action) => {
    return (0, immer_1.produce)(state, (draft) => {
        switch (action.type) {
            case "FETCHING_OPTIONS":
                draft.isFetching = true;
                draft.options = null;
                return draft;
            case "RECEIVED_OPTIONS":
                draft.isFetching = false;
                draft.options = action.options;
                return draft;
            default:
                return state;
        }
    });
};
const shortcutsInitialState = {
    isFetching: false,
    shortcuts: [],
};
const KeyboardShortcutsReducer = (state = shortcutsInitialState, action) => {
    return (0, immer_1.produce)(state, (draft) => {
        switch (action.type) {
            case "FETCHING_KEYBOARD_SHORTCUTS":
                draft.isFetching = true;
                draft.shortcuts = [];
                return draft;
            case "RECEIVED_KEYBOARD_SHORTCUTS":
                draft.isFetching = false;
                draft.shortcuts = action.shortcuts;
                return draft;
            default:
                return state;
        }
    });
};
const authInitialState = {
    user: null,
    claims: null,
};
const AuthReducer = (state = authInitialState, action) => {
    return (0, immer_1.produce)(state, (draft) => {
        switch (action.type) {
            case "UPDATE_AUTH_STATE": {
                draft.user = action.user;
                draft.claims = action.claims;
                return draft;
            }
            default:
                return draft;
        }
    });
};
exports.default = (0, redux_1.combineReducers)({
    authData: AuthReducer,
    optionsData: OptionsReducer,
    keyboardShortcutsData: KeyboardShortcutsReducer,
});
