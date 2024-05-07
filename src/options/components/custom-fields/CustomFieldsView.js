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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const helpers_1 = require("src/common/helpers");
const actions_1 = require("src/options/actions");
const CustomFieldModal_1 = __importDefault(require("src/options/components/custom-fields/CustomFieldModal"));
const CustomFieldsList_1 = __importDefault(require("src/options/components/custom-fields/CustomFieldsList"));
const GetProModal_1 = __importDefault(require("src/options/components/custom-fields/GetProModal"));
const MAX_CUSTOM_FIELDS = 25;
function CustomFieldsView(props) {
    const { isProEdition, profileIndex, customFields } = props;
    const [modalIsOpen, setModalIsOpen] = (0, react_1.useState)(false);
    const [getProModalIsOpen, setGetProModalIsOpen] = (0, react_1.useState)(false);
    const [customFieldIndex, setCustomFieldIndex] = (0, react_1.useState)(-1);
    const [customField, setCustomField] = (0, react_1.useState)(null);
    const [actionType, setActionType] = (0, react_1.useState)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const allowAdd = isProEdition || profileIndex === -1;
    const allowEdit = isProEdition || profileIndex === -1;
    function closeModal() {
        setModalIsOpen(false);
        setCustomField(null);
        setActionType(undefined);
        setCustomFieldIndex(-1);
    }
    function newCustomField(index) {
        if (allowEdit) {
            if (!isProEdition && props.customFields.length >= MAX_CUSTOM_FIELDS) {
                setGetProModalIsOpen(true);
            }
            else {
                setCustomFieldIndex(index);
                setActionType("create");
                setCustomField(null);
                setModalIsOpen(true);
            }
        }
    }
    function handleEdit(currentCustomField, index) {
        if (allowEdit) {
            setCustomFieldIndex(index);
            setCustomField(currentCustomField);
            setActionType("edit");
            setModalIsOpen(true);
        }
    }
    function handleDelete(index) {
        if (allowEdit) {
            // eslint-disable-next-line no-alert
            if (window.confirm((0, helpers_1.GetMessage)("customFields_delete_confirm_message"))) {
                dispatch((0, actions_1.deleteCustomField)(index, profileIndex));
            }
        }
    }
    function handleSort(sortedCustomFields) {
        if (allowEdit) {
            dispatch((0, actions_1.saveSortedCustomFields)(sortedCustomFields, profileIndex));
        }
    }
    function handleSave(formValues) {
        if (allowEdit) {
            if (actionType === "edit") {
                dispatch((0, actions_1.saveCustomField)(formValues, customFieldIndex, profileIndex));
            }
            else {
                dispatch((0, actions_1.createCustomField)(formValues, customFieldIndex, profileIndex));
            }
            closeModal();
        }
    }
    return (<>
      <CustomFieldsList_1.default customFields={customFields} allowAdd={allowAdd} allowEdit={allowEdit} onAdd={newCustomField} onEdit={handleEdit} onDelete={handleDelete} onSort={handleSort}/>

      <CustomFieldModal_1.default isOpen={modalIsOpen} customField={customField} onClose={closeModal} onSave={handleSave}/>
      <GetProModal_1.default isOpen={getProModalIsOpen} onClose={() => setGetProModalIsOpen(false)}/>
    </>);
}
exports.default = CustomFieldsView;
