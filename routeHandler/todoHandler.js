// Dependencies
const express = require("express");
const router = express.Router();
const todoController = require('../controller/todoController')


// GET all the todos
router.get("/", todoController.getAllTodos);

// GET a single todo by ID
router.get("/todos/:id", todoController.getTodoById);

// INSERT one todo
router.post("/todos", todoController.insertTodo);

// INSERT multiple todos
router.post("/todos/all", todoController.insertMultipleTodos);

// UPDATE a todo by ID
router.put("/todos/:id", todoController.updateTodoById);

// DELETE a todo by ID
router.delete("/todos/:id", todoController.deleteTodoById);

// GET ACTIVE TODOS


router.get("/active", todoController.getActiveTodoUsingAsync);


router.get("/active-callback", todoController.getActiveTodoUsingAsync);

// Find words 

//  Find words Using Async Await-static method
router.get("/find-words", todoController.findWordsUsingStatic);



// GET  TODOS By Query helpers  
router.get("/query-helpers", todoController.queryHelpers);


// Exporting the router
module.exports = router;
