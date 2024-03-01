import express, { Request, Response } from "express";
import cors from "cors";
import pool from "./db";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// Routes

// create a todo
app.post("/todos", async (req: Request, res: Response) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err: Error | any) {
    console.error(err.message);

    if (err instanceof Error) {
      res.status(500).send(`Server Error: ${err.message}`);
    } else {
      res.status(500).send("Server Error");
    }
  }
});

// get all todo
app.get("/todos", async (_: Request, res: Response) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err: Error | any) {
    console.error(err.message);

    if (err instanceof Error) {
      res.status(500).send(`Server Error: ${err.message}`);
    } else res.status(500).send("Server Error");
  }
});

// get a todo
app.get("/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (err: Error | any) {
    console.error(err.message);

    if (err instanceof Error) {
      res.status(500).send(`Server Error: ${err.message}`);
    } else res.status(500).send("Server Error");
  }
});

// update a todo
app.put("/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("Todo was updated!!");
  } catch (err: Error | any) {
    console.error(err.message);

    if (err instanceof Error) {
      res.status(500).send(`Server Error: ${err.message}`);
    } else res.status(500).send("Server Error");
  }
});

// delete a todo
app.delete("/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json("Todo was deleted!");
  } catch (err: Error | any) {
    console.error(err.message);

    if (err instanceof Error) {
      res.status(500).send(`Server Error: ${err.message}`);
    } else res.status(500).send("Server Error");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
