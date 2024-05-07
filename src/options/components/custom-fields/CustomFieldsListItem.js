"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_beautiful_dnd_1 = require("react-beautiful-dnd");
const helpers_1 = require("src/common/helpers");
const AddFieldButton_1 = __importDefault(require("src/options/components/custom-fields/AddFieldButton"));
function isNotEmpty(item) {
    return item !== undefined && item !== null && !Number.isNaN(parseInt(String(item), 10));
}
function isNotZero(item) {
    if (isNotEmpty(item)) {
        const value = parseFloat(String(item));
        return value !== 0;
    }
    return false;
}
const CustomFieldsListItem = (props) => {
    const { customField } = props;
    function handleEdit() {
        props.onEdit(props.customField, props.itemIndex);
    }
    function handleDelete() {
        props.onDelete(props.itemIndex);
    }
    return (<react_beautiful_dnd_1.Draggable draggableId={`draggable-${props.itemIndex}`} index={props.itemIndex}>
      {(provided) => {
            var _a, _b;
            return (<div ref={provided.innerRef} {...provided.draggableProps}>
          <div className="card custom-field">
            <div className="card-header">
              <strong>{customField.name}</strong>
              <div className={`custom-field-buttons ${props.allowEdit ? "" : "invisible"}`}>
                <div className="btn btn-sm btn-link drag-handle" {...provided.dragHandleProps}>
                  <img src="images/move.svg" width="12" height="12" alt={(0, helpers_1.GetMessage)("move")}/>
                </div>
                <button type="button" className="btn btn-sm btn-link" onClick={handleEdit} disabled={!props.allowEdit}>
                  <img src="images/edit.svg" width="12" height="12" alt={(0, helpers_1.GetMessage)("edit")}/>
                </button>
                <button type="button" className="btn btn-sm btn-link" onClick={handleDelete} disabled={!props.allowEdit}>
                  <img src="images/delete.svg" width="12" height="12" alt={(0, helpers_1.GetMessage)("delete")}/>
                </button>
              </div>
            </div>
            <table className="table">
              <tbody>
                <tr>
                  <td className="col-3">{(0, helpers_1.GetMessage)("customFields_label_dataType")}</td>
                  <td>{customField.type}</td>
                </tr>
                <tr>
                  <td>{(0, helpers_1.GetMessage)("customFields_label_match")}</td>
                  <td>{customField.match.join(", ")}</td>
                </tr>
                {customField.template && (<tr>
                    <td>{(0, helpers_1.GetMessage)("customFields_label_template")}</td>
                    <td>{customField.template}</td>
                  </tr>)}
                {isNotEmpty(customField.min) && (<tr>
                    <td>{(0, helpers_1.GetMessage)("customFields_label_minValue")}</td>
                    <td>
                      {customField.min}
                      {customField.type === "date" ? ` ${(0, helpers_1.GetMessage)("customFields_label_daysFromToday")}` : null}
                    </td>
                  </tr>)}
                {isNotEmpty(customField.minDate) && (<tr>
                    <td>{(0, helpers_1.GetMessage)("customFields_label_minValue")}</td>
                    <td>{customField.minDate}</td>
                  </tr>)}
                {isNotEmpty(customField.max) && (<tr>
                    <td>{(0, helpers_1.GetMessage)("customFields_label_maxValue")}</td>
                    <td>
                      {customField.max}
                      {customField.type === "date" ? ` ${(0, helpers_1.GetMessage)("customFields_label_daysFromToday")}` : null}
                    </td>
                  </tr>)}
                {isNotEmpty(customField.maxDate) && (<tr>
                    <td>{(0, helpers_1.GetMessage)("customFields_label_maxValue")}</td>
                    <td>{customField.maxDate}</td>
                  </tr>)}
                {isNotZero(customField.decimalPlaces) && (<tr>
                    <td>{(0, helpers_1.GetMessage)("customFields_label_decimalPlaces")}</td>
                    <td>{customField.decimalPlaces}</td>
                  </tr>)}
                {isNotEmpty(customField.maxLength) && (<tr>
                    <td>{(0, helpers_1.GetMessage)("customFields_label_maxLength")}</td>
                    <td>{customField.maxLength}</td>
                  </tr>)}
                {customField.list && (<tr>
                    <td>{(0, helpers_1.GetMessage)("customFields_label_listItems")}</td>
                    <td>{customField.list.join(", ")}</td>
                  </tr>)}
                {!!customField.emailPrefix && (<tr>
                    <td>{(0, helpers_1.GetMessage)("customFields_label_emailUsernamePrefix")}</td>
                    <td>{customField.emailPrefix}</td>
                  </tr>)}
                {customField.emailUsername && (<tr>
                    <td>{(0, helpers_1.GetMessage)("customFields_label_username")}</td>
                    <td>
                      {customField.emailUsername === "regex" && customField.emailUsernameRegEx}
                      {customField.emailUsername === "list" && ((_a = customField.emailUsernameList) === null || _a === void 0 ? void 0 : _a.join(", "))}
                      {customField.emailUsername === "random" && (0, helpers_1.GetMessage)("customFields_label_random")}
                      {customField.emailUsername === "username" && (0, helpers_1.GetMessage)("customFields_label_previousUsername")}
                      {customField.emailUsername === "name" && (0, helpers_1.GetMessage)("customFields_label_previousName")}
                    </td>
                  </tr>)}
                {customField.emailHostname && (<tr>
                    <td>{(0, helpers_1.GetMessage)("customFields_label_hostname")}</td>
                    <td>
                      {customField.emailHostname === "list" && ((_b = customField.emailHostnameList) === null || _b === void 0 ? void 0 : _b.join(", "))}
                      {customField.emailHostname === "random" && (0, helpers_1.GetMessage)("customFields_label_random")}
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
          {props.allowAdd && (<AddFieldButton_1.default index={props.itemIndex + 1} onClick={props.onAdd} disabled={!props.allowAdd}/>)}
        </div>);
        }}
    </react_beautiful_dnd_1.Draggable>);
};
exports.default = CustomFieldsListItem;
