"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const element_filler_1 = __importDefault(require("src/common/element-filler"));
class FakeFiller {
    constructor(options, profileIndex = -1) {
        this.elementFiller = new element_filler_1.default(options, profileIndex);
    }
    fillAllElements(container) {
        container.querySelectorAll("input:not(:disabled):not([readonly])").forEach((element) => {
            this.elementFiller.fillInputElement(element);
        });
        container.querySelectorAll("textarea:not(:disabled):not([readonly])").forEach((element) => {
            this.elementFiller.fillTextAreaElement(element);
        });
        container.querySelectorAll("select:not(:disabled):not([readonly])").forEach((element) => {
            this.elementFiller.fillSelectElement(element);
        });
        container.querySelectorAll("[contenteditable]").forEach((element) => {
            this.elementFiller.fillContentEditableElement(element);
        });
    }
    setClickedElement(element) {
        this.clickedElement = element;
    }
    fillAllInputs() {
        this.fillAllElements(document);
    }
    fillThisInput() {
        const element = this.clickedElement || document.activeElement;
        if (element) {
            const tagName = element.tagName.toLowerCase();
            if (tagName === "input") {
                this.elementFiller.fillInputElement(element);
            }
            else if (tagName === "textarea") {
                this.elementFiller.fillTextAreaElement(element);
            }
            else if (tagName === "select") {
                this.elementFiller.fillSelectElement(element);
            }
            else if (element.isContentEditable) {
                this.elementFiller.fillContentEditableElement(element);
            }
        }
        this.setClickedElement(undefined);
    }
    fillThisForm() {
        const element = this.clickedElement || document.activeElement;
        if (element && element.tagName.toLowerCase() !== "body") {
            const form = element.closest("form");
            if (form) {
                this.fillAllElements(form);
            }
        }
        this.setClickedElement(undefined);
    }
}
exports.default = FakeFiller;
