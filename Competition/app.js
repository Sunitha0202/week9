const express = require("express");
const app = express();
const methodOverride = require('method-override')

const connectDB = require("./config/db");
const logger = require("./middlewares/logger")

const bookAPI = require("./controllers/bookAPIController");
const bookSSR = require("./controllers/bookSSRController");
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(logger) 

// Set views directory for EJS templates
app.set("views", "views");
// Set EJS as the view engine
app.set("view engine", "ejs");
// Serve static files from the "public" directory
app.use(express.static("public"));

// Connect to MongoDB
connectDB();
 
// SSR

// End1: Route to render index.html with books using EJS
app.get("/", bookSSR.renderBooks);
// End2: Define a route to render the addbook.ejs view
app.get("/addbook", bookSSR.renderForm);
// End3:Route to add  book using EJ
app.post("/addbook", bookSSR.addBook);
// Define a route to render the singlebook.ejs view
app.get("/single-book/:id", bookSSR.renderBook);
// Define a route to delete singlebook
app.delete("/single-book/:id", bookSSR.deleteBook);
// Define a route to update single book.ejs
app.put("/single-book/:id", bookSSR.updateBook);
// Define book to update
app.get("/single-book/update/:id", bookSSR.renderUpdateBook);

// API
// GET all Books
app.get("/api/books", bookAPI.getBooks);
// POST a new Book
app.post("/api/books", bookAPI.addBook);
// GET a single Book
app.get("/api/books/:id", bookAPI.getBook);

// Update Book using PUT
app.put("/api/books/:id", bookAPI.updateBook);
// DELETE a Book
app.delete("/api/books/:id", bookAPI.deleteBook);
// DELETE all Book
app.delete("/api/books", bookAPI.deleteAllBooks);

const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

