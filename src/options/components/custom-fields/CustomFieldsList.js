"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_beautiful_dnd_1 = require("react-beautiful-dnd");
const AddFieldButton_1 = __importDefault(require("src/options/components/custom-fields/AddFieldButton"));
const CustomFieldsListItem_1 = __importDefault(require("src/options/components/custom-fields/CustomFieldsListItem"));
function reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
}
const CustomFieldsList = (props) => {
    function onSortEnd(result) {
        if (!result.destination) {
            return;
        }
        const sortedCustomFields = reorder(props.customFields, result.source.index, result.destination.index);
        props.onSort(sortedCustomFields);
    }
    return (<>
      {props.allowAdd && <AddFieldButton_1.default index={0} onClick={props.onAdd} disabled={!props.allowAdd}/>}
      <react_beautiful_dnd_1.DragDropContext onDragEnd={onSortEnd}>
        <react_beautiful_dnd_1.Droppable droppableId="droppable">
          {(provided) => (<div className="custom-fields-list" ref={provided.innerRef} {...provided.droppableProps}>
              {props.customFields.map((item, index) => (<CustomFieldsListItem_1.default 
            // eslint-disable-next-line react/no-array-index-key
            key={index} customField={item} itemIndex={index} allowAdd={props.allowAdd} allowEdit={props.allowEdit} onAdd={props.onAdd} onEdit={props.onEdit} onDelete={props.onDelete}/>))}
              {provided.placeholder}
            </div>)}
        </react_beautiful_dnd_1.Droppable>
      </react_beautiful_dnd_1.DragDropContext>
    </>);
};
exports.default = CustomFieldsList;
