const express = require("express");
const todoHandler = require("./routeHandler/todoHandler");
const userHandler = require("./routeHandler/userHandler");
const connectDB = require("./utils/db");
const dotenv = require('dotenv')

const app = express();

dotenv.config()

app.use(express.json());

connectDB(); 

app.use(todoHandler);
app.use('/user',userHandler);

// Default error handler
const  errorHandler = (err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res.status(500).json({ err: err });
}
app.use(errorHandler)
app.listen(5000, () => {
  console.log("App listening on port 3000");
});
