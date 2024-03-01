"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { error } = require("console");
// middleware
app.use(cors());
app.use(express.json());
// Routes
// create a todo
app.post("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description } = req.body;
        const newTodo = yield pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    }
    catch (err) {
        console.error(err.message);
    }
}));
// get all todo
app.get("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTodos = yield pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    }
    catch (err) {
        console.log(err.message);
    }
}));
// get a todo
app.get("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield pool.query("SELECT * FROM todo WHERE todo_id = $1", [
            id,
        ]);
        res.json(todo.rows[0]);
    }
    catch (err) {
        console.log(err.message);
    }
}));
// update a todo
app.put("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = yield pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("Todo was updated!!");
    }
    catch (err) {
        console.log(err.message);
    }
}));
// delete a todo
app.delete("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteTodo = yield pool.query("Delete FROM todo WHERE todo_id = $1", [
            id,
        ]);
        res.json('Todo was deleted!');
    }
    catch (err) {
        console.log(err.message);
    }
}));
app.listen(5000, () => {
    console.log("Server is listening on port: 5000");
});
