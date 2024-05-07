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
Object.defineProperty(exports, "__esModule", { value: true });
const fileSaver = __importStar(require("file-saver"));
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const helpers_1 = require("src/common/helpers");
const actions_1 = require("src/options/actions");
function utf8ToBase64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}
function base64ToUtf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}
const BackupAndRestorePage = () => {
    const [showSuccess, setShowSuccess] = (0, react_1.useState)(false);
    const [backupData, setBackupData] = (0, react_1.useState)("");
    const [errorMessage, setErrorMessage] = (0, react_1.useState)("");
    const [isVersionMismatch, setIsVersionMismatch] = (0, react_1.useState)(false);
    const [importedOptions, setImportedOptions] = (0, react_1.useState)();
    const isFetching = (0, react_redux_1.useSelector)((state) => state.optionsData.isFetching);
    const options = (0, react_redux_1.useSelector)((state) => state.optionsData.options);
    const dispatch = (0, react_redux_1.useDispatch)();
    (0, react_1.useEffect)(() => {
        dispatch((0, actions_1.getOptions)());
    }, [dispatch]);
    const currentOptionsVersion = (options && options.version) || 0;
    function getDateString(date) {
        const year = date.getFullYear();
        const month = `0${date.getMonth() + 1}`.slice(-2);
        const day = `0${date.getDate()}`.slice(-2);
        return `${year}-${month}-${day}`;
    }
    function exportSettings() {
        const encodedData = utf8ToBase64(JSON.stringify(options));
        const dateStamp = getDateString(new Date());
        try {
            const blob = new Blob([encodedData], { type: "text/plain;charset=utf-8" });
            fileSaver.saveAs(blob, `fake-filler-${dateStamp}.txt`);
        }
        catch (e) {
            setErrorMessage((0, helpers_1.GetMessage)("backupRestore_errorCreatingBackupFile", e.toString()));
            setBackupData(encodedData);
        }
    }
    function importSettings() {
        const fileElement = document.getElementById("file");
        if (fileElement.files && fileElement.files.length === 1 && fileElement.files[0].name.length > 0) {
            // eslint-disable-next-line no-alert
            if (window.confirm((0, helpers_1.GetMessage)("backupRestore_confirmRestore"))) {
                const fileReader = new FileReader();
                fileReader.onload = (e) => {
                    try {
                        const reader = e.target;
                        const decodedData = base64ToUtf8(reader.result);
                        const decodedOptions = JSON.parse(decodedData);
                        const importedOptionsVersion = decodedOptions.version || 0;
                        if (currentOptionsVersion === importedOptionsVersion) {
                            dispatch((0, actions_1.saveOptions)(decodedOptions)).then(() => {
                                setShowSuccess(true);
                                setErrorMessage("");
                            });
                        }
                        else {
                            setImportedOptions(decodedOptions);
                            setIsVersionMismatch(true);
                        }
                    }
                    catch (ex) {
                        setShowSuccess(false);
                        setErrorMessage((0, helpers_1.GetMessage)("backupRestore_errorImporting", ex.toString()));
                    }
                };
                fileReader.onerror = () => {
                    setShowSuccess(false);
                    setErrorMessage((0, helpers_1.GetMessage)("backupRestore_errorReadingFile"));
                };
                fileReader.readAsText(fileElement.files[0]);
            }
        }
    }
    function forceImportOldSettings() {
        // eslint-disable-next-line no-alert
        if (importedOptions && window.confirm((0, helpers_1.GetMessage)("backupRestore_confirmImportOldBackup"))) {
            dispatch((0, actions_1.saveOptions)(importedOptions)).then(() => {
                setShowSuccess(true);
                setErrorMessage("");
                setIsVersionMismatch(false);
            });
        }
    }
    function triggerImportSettings() {
        const fileElement = document.getElementById("file");
        fileElement.click();
    }
    function selectTextAreaText() {
        const textAreaElement = document.getElementById("backupTextArea");
        textAreaElement.select();
    }
    let backupDataElements = null;
    if (backupData) {
        backupDataElements = (<div className="form-group">
        <textarea id="backupTextArea" className="form-control" rows={10} onClick={selectTextAreaText} readOnly>
          {backupData}
        </textarea>
        <div className="help-text">{(0, helpers_1.GetMessage)("backupRestore_copyAndSaveToFile")}</div>
      </div>);
    }
    if (isFetching) {
        return <div>{(0, helpers_1.GetMessage)("loading")}</div>;
    }
    return (<>
      <h2>{(0, helpers_1.GetMessage)("backupRestore_title")}</h2>
      <p>
        <button type="button" className="btn btn-link" onClick={exportSettings}>
          {(0, helpers_1.GetMessage)("backupRestore_exportSettings")}
        </button>
      </p>
      <p>
        <button type="button" className="btn btn-link" onClick={triggerImportSettings}>
          {(0, helpers_1.GetMessage)("backupRestore_importSettings")}
        </button>
      </p>
      {backupDataElements}
      <input type="file" className="invisible" id="file" onChange={importSettings}/>
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      {showSuccess && <p className="alert alert-success">{(0, helpers_1.GetMessage)("backupRestore_settingImportSuccessMessage")}</p>}

      {isVersionMismatch && (<div className="alert alert-danger">
          <p>{(0, helpers_1.GetMessage)("backupRestore_oldBackupErrorMessage")}</p>
          <div>
            <button type="button" className="btn btn-sm font-weight-bold btn-link p-0 text-danger" onClick={forceImportOldSettings}>
              {(0, helpers_1.GetMessage)("backupRestore_continueAnyway")}
            </button>
          </div>
        </div>)}
    </>);
};
exports.default = BackupAndRestorePage;
