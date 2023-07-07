const todoSchema = require("../model/schemas/todoSchema");
const userSchema = require("../model/schemas/userSchema");
const mongoose = require("mongoose");
const Todo = mongoose.model("Todo", todoSchema);
const User = mongoose.model("User", userSchema);

// GET all the todos
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({}).populate("user", "name username -_id");

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
    const newTodo = new Todo({
      ...req.body,
      user: req.userId,
    });
    const todo = await newTodo.save();
    await User.updateOne(
      {
        _id: req.userId,
      },
      {
        $push: {
          todos: todo._id,
        },
      }
    );
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

// GET ACTIVE TODOS
const getActiveTodoUsingAsync = async (req, res) => {
  try {
    const todo = new Todo();
    const data = await todo.findActive();
    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "There was a server-side error!!",
    });
  }
};

// GET ACTIVE TODOS Using Callback

const getActiveTodoUsingCallback = (req, res) => {
  try {
    const todo = new Todo();
    todo.findActive((err, data) => {
      res.status(200).json({ data });
    });
  } catch (error) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
};


// Find words- static methhods
/**
 *
 * @findWordsUsingStatic  find words meeting in title
 *
 */
const findWordsUsingStatic = async (req, res) => {
  try {
    const data = await Todo.findWords();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
};

// Using query helpers
const queryHelpers = async (req, res) => {
  try {
    const data = await Todo.find().byQery("complete");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({
      error: "There was a server-side error!",
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
  getActiveTodoUsingAsync,
  getActiveTodoUsingCallback,
  findWordsUsingStatic,
  queryHelpers,
};
