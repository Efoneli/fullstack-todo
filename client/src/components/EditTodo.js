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
const react_1 = __importStar(require("react"));
const EditTodo = ({ todo }) => {
    const [description, setDescription] = (0, react_1.useState)(todo.description);
    const updateDescription = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            const body = { description };
            const response = yield fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            window.location = "/";
        }
        catch (err) {
            console.error(err.message);
        }
    });
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement("button", { type: "button", className: "btn btn-warning", "data-toggle": "modal", "data-target": `#id${todo.todo_id}`, onClick: () => setDescription(todo.description) }, "Edit"),
        react_1.default.createElement("div", { className: "modal", id: `id${todo.todo_id}` },
            react_1.default.createElement("div", { className: "modal-dialog" },
                react_1.default.createElement("div", { className: "modal-content" },
                    react_1.default.createElement("div", { className: "modal-header" },
                        react_1.default.createElement("h4", { className: "modal-title" }, "Edit Todo"),
                        react_1.default.createElement("button", { type: "button", className: "close", "data-dismiss": "modal", onClick: () => setDescription(todo.description) }, "\u00D7")),
                    react_1.default.createElement("div", { className: "modal-body" },
                        react_1.default.createElement("input", { type: "text", className: "form-control", value: description, onChange: (e) => setDescription(e.target.value) })),
                    react_1.default.createElement("div", { className: "modal-footer" },
                        react_1.default.createElement("button", { type: "button", className: "btn btn-warning", "data-dismiss": "modal", onClick: (e) => updateDescription(e) }, "Edit"),
                        react_1.default.createElement("button", { type: "button", className: "btn btn-danger", "data-dismiss": "modal", onClick: () => setDescription(todo.description) }, "Close")))))));
};
exports.default = EditTodo;
