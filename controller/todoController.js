const todoSchema = require('../model/schemas/todoSchema');
const mongoose = require("mongoose");
const Todo = new mongoose.model("Todos", todoSchema);


// GET all the todos
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({});

    res.status(200).json({
      message: "Todos retrieved successfully!",
      todos: todos,
    });
  } catch (error) {
    res.status(500).json({
      error: "There was a server-side error",
    });
  }
};

// GET a single todo by ID
const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        error: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Todo retrieved successfully!",
      todo: todo,
    });
  } catch (error) {
    res.status(500).json({
      error: "There was a server-side error",
    });
  }
};

// INSERT one todo
const insertTodo = async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(200).json({
      message: "Todo was inserted successfully!",
      todo: newTodo,
    });
  } catch (error) {
    res.status(500).json({
      error: "There was a server-side error",
    });
  }
};

// INSERT multiple todos
const insertMultipleTodos = async (req, res) => {
  try {
    const response = await Todo.insertMany(req.body);
    res.status(200).json({
      message: "All Todos were inserted successfully!",
      todos: response,
    });
  } catch (error) {
    res.status(500).json({
      error: "There was a server-side error",
    });
  }
};

// UPDATE a todo by ID
const updateTodoById = async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;

    const updatedObj = {
      title,
      description,
      status,
    };

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      updatedObj,
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({
        error: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Todo updated successfully!",
      updatedTodo: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({
      error: "There was a server-side error",
    });
  }
};

// DELETE a todo by ID
const deleteTodoById = async (req, res) => {
  try {
    const deletedTodo = await Todo.deleteOne({ _id: req.params.id });

    if (!deletedTodo) {
      return res.status(404).json({
        error: "Todo not found",
      });
    }
    res.status(200).json({
      message: "Todo deleted successfully!",
      deletedTodo: deletedTodo,
    });
  } catch (error) {
    res.status(500).json({
      error: "There was a server-side error",
    });
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  insertTodo,
  insertMultipleTodos,
  updateTodoById,
  deleteTodoById,
};
