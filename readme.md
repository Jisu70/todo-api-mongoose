Certainly! I have updated the README file to include the features you mentioned. Here's the updated README:

# Todo API

This is a Todo API endpoint that allows you to manage todos using MongoDB as the database and Mongoose as the ODM (Object Data Modeling) library. The project is structured following the MVC (Model-View-Controller) pattern.

## Features

- Retrieve all todos
- Retrieve a single todo by its ID
- Insert a new todo
- Insert multiple todos
- Update a todo by its ID
- Delete a todo by its ID
- Mongoose instance
- Static methods
- Query helper methods
- User login API with JWT authentication

## Project Structure

The project follows the MVC (Model-View-Controller) structure, which helps in organizing the codebase and separating concerns.

- **Model**: Contains the `todoSchema` that defines the structure of the Todo model in MongoDB.
- **Controller**: Contains the logic for handling various API endpoints, such as retrieving, inserting, updating, and deleting todos.
- **Routes**: Defines the routes for the API endpoints and maps them to their respective controller functions.
- **index.js**: The main entry point of the application that sets up the server and connects to the MongoDB database.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up the MongoDB connection:
   
   Update the MongoDB connection URL in the `app.js` file:

   ```javascript
   mongoose.connect('mongodb://<username>:<password>@<host>:<port>/<database-name>', {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   });
   ```

   or

   If you are connecting to a local MongoDB instance, you can use the following code snippet instead:

   ```javascript
   const mongoose = require("mongoose");

   const connectDB = async () => {
     try {
       await mongoose.connect("mongodb://127.0.0.1:27017/test", {
         useNewUrlParser: true,
         useUnifiedTopology: true,
       });
       console.log("Connected successfully to the database!");
     } catch (error) {
       console.error("Database connection error:", error);
     }
   };

   connectDB();
   ```

## Usage

Start the server by running the following command:

```bash
npm start
```

The server will start running at `http://localhost:3000`.

## API Endpoints

- `GET /todos`: Retrieves all todos.
- `GET /todos/:id`: Retrieves a single todo by its ID.
- `POST /todos`: Inserts a new todo.
- `POST /todos/bulk`: Inserts multiple todos.
- `PUT /todos/:id`: Updates a todo by its ID.
- `DELETE /todos/:id`: Deletes a todo by its ID.
- `POST /login`: User login API with JWT authentication.

For detailed information about the request and response formats, please refer to the code comments in the provided code.

Please note that for a complete understanding of the code, you will need to refer to the actual implementation. This README provides an overview of the features added.