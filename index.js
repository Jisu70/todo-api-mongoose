const express = require("express");
const todoHandler = require("./routeHandler/todoHandler");
const connectDB = require("./utils/db");

const app = express();

app.use(express.json());

connectDB(); 

app.use(todoHandler);

// Default error handler
function errorHandler(err, req, res, next) {
  if (res.headerSent) {
    return next(err);
  }
  res.status(500).json({ err: err });
}

app.listen(5000, () => {
  console.log("App listening on port 3000");
});
