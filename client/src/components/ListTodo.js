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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const EditTodo_1 = __importDefault(require("./EditTodo"));
const ListTodo = () => {
    const [todos, setTodos] = (0, react_1.useState)([]);
    const deleteTodo = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleteTodo = yield fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE",
            });
            setTodos(todos.filter((todo) => todo.todo_id !== id));
        }
        catch (err) {
            console.log(err.message);
        }
    });
    const getTodos = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:5000/todos");
            const jsonData = yield response.json();
            setTodos(jsonData);
        }
        catch (err) {
            console.error(err.message);
        }
    });
    (0, react_1.useEffect)(() => {
        getTodos();
    }, []);
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement("table", { className: "table mt-5 text-center " },
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", null, "Description"),
                    react_1.default.createElement("th", null, "Edit"),
                    react_1.default.createElement("th", null, "Delete"))),
            react_1.default.createElement("tbody", null, todos.map((todo) => (react_1.default.createElement("tr", { key: todo.todo_id },
                react_1.default.createElement("td", null, todo.description),
                react_1.default.createElement("td", null,
                    react_1.default.createElement(EditTodo_1.default, { todo: todo })),
                react_1.default.createElement("td", null,
                    react_1.default.createElement("button", { className: "btn btn-danger", onClick: () => deleteTodo(todo.todo_id) },
                        "Delete",
                        " ")))))))));
};
exports.default = ListTodo;
