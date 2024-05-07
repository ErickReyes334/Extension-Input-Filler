"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getOptionsLastUpdatedTimestamp = exports.saveOptionsToDb = exports.logout = exports.login = exports.onOptionsChange = exports.onAuthStateChange = void 0;
const firebase = __importStar(require("firebase/app"));
require("firebase/auth");
require("firebase/firestore");
firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
});
firebase.firestore.setLogLevel("silent");
const auth = firebase.auth();
const db = firebase.firestore();
let firebaseUser = null;
let firebaseClaims = null;
let userClaimsUpdatedAt = null;
let optionsUpdatedAt = null;
let userSnapshotUnsubscribe = null;
let authStateChangeCallback = null;
let optionsSnapshotUnsubscribe = null;
let optionsChangeCallback = null;
function unsubscribeAllSnapshots() {
    if (userSnapshotUnsubscribe) {
        userSnapshotUnsubscribe();
    }
    if (optionsSnapshotUnsubscribe) {
        optionsSnapshotUnsubscribe();
    }
}
function onNewSettings(snapshot) {
    const data = snapshot.data();
    if (!snapshot.metadata.hasPendingWrites && data && data.updatedAt && data.options) {
        optionsUpdatedAt = data.updatedAt;
        const options = JSON.parse(data.options);
        if (optionsChangeCallback) {
            optionsChangeCallback(options);
        }
    }
}
function onNewClaims(snapshot) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = snapshot.data();
        if (firebaseUser && data && data.claimsUpdatedAt) {
            if (userClaimsUpdatedAt && !data.claimsUpdatedAt.isEqual(userClaimsUpdatedAt)) {
                yield firebaseUser.getIdToken(true);
            }
            userClaimsUpdatedAt = data.claimsUpdatedAt;
        }
    });
}
auth.onAuthStateChanged((user) => {
    firebaseUser = user;
    if (user) {
        unsubscribeAllSnapshots();
        userSnapshotUnsubscribe = db.collection("users").doc(user.uid).onSnapshot(onNewClaims);
        optionsSnapshotUnsubscribe = db.collection("settings").doc(user.uid).onSnapshot(onNewSettings);
    }
    else {
        unsubscribeAllSnapshots();
        if (authStateChangeCallback) {
            authStateChangeCallback(null, null);
        }
    }
});
auth.onIdTokenChanged((user) => __awaiter(void 0, void 0, void 0, function* () {
    if (authStateChangeCallback) {
        if (user) {
            const result = yield user.getIdTokenResult(false);
            firebaseClaims = result.claims;
            authStateChangeCallback(user, firebaseClaims);
        }
        else {
            authStateChangeCallback(null, null);
        }
    }
}));
function onAuthStateChange(callback) {
    authStateChangeCallback = callback;
}
exports.onAuthStateChange = onAuthStateChange;
function onOptionsChange(callback) {
    optionsChangeCallback = callback;
}
exports.onOptionsChange = onOptionsChange;
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        yield auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const result = yield auth.signInWithEmailAndPassword(email, password);
        if (result && result.user && result.user.email) {
            firebaseUser = result.user;
            return firebaseUser;
        }
        return null;
    });
}
exports.login = login;
function logout() {
    unsubscribeAllSnapshots();
    optionsUpdatedAt = null;
    return auth.signOut();
}
exports.logout = logout;
function saveOptionsToDb(options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (firebaseUser && firebaseClaims && firebaseClaims.subscribed) {
            const updatedAt = firebase.firestore.FieldValue.serverTimestamp();
            yield db
                .collection("settings")
                .doc(firebaseUser.uid)
                .set({ options: JSON.stringify(options), updatedAt }, { merge: true });
            return updatedAt;
        }
        return null;
    });
}
exports.saveOptionsToDb = saveOptionsToDb;
function getOptionsLastUpdatedTimestamp() {
    return __awaiter(this, void 0, void 0, function* () {
        if (optionsUpdatedAt) {
            return optionsUpdatedAt.toDate();
        }
        if (firebaseUser) {
            const result = yield db.collection("settings").doc(firebaseUser.uid).get();
            if (result.exists) {
                optionsUpdatedAt = result.data().updatedAt;
                return optionsUpdatedAt.toDate();
            }
        }
        return undefined;
    });
}
exports.getOptionsLastUpdatedTimestamp = getOptionsLastUpdatedTimestamp;
