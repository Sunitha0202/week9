const Book = require("../models/bookModel");

// Render Controller: Render index.html with books using EJS
const renderBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.render("index", { books }); // Render index.ejs with books data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};

// Get Book by ID
const renderBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.render("notfound");
    }
    res.render("singlebook", { book }); // Render index.ejs with 
  } catch (error) {
    console.error("Error rendering Book:", error);
    res.status(500).render("error");
  }
};
 
const renderForm = (req, res) => {
  try {
    res.render("addbook"); // Assuming "addbook.ejs" is located in the "views" directory
  } catch (error) {
    console.error("Error rendering form", error);
    res.status(500).render("error");
  }
};

// Controller function to handle adding a new book (used for rendering and API)
const addBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    // Convert the achieved field to a Boolean
    const achieved = req.body.achieved === "on";
    const newBook = new Book({ title, author, genre });
    await newBook.save();
    // Redirect to the main page after successfully adding the book
    console.log("Book added successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).render("error");
  }
};

// Delete Book by ID
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete({ _id: id });
    if (!book) {
      return res.status(404).render("notfound");
    }
    console.log("Book delted successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error deleteing Book:", error);
    res.status(500).render("error");
  }
};


// Update Book by ID
const renderUpdateBook = async (req, res) => {
  try {
    const { id } = req.params;
     
    // Fetch the book by id
    const book = await Book.findById(id);

    if (!book) {
      return res.render("notfound");
    }

    // Render the singlebook.ejs template with the book data
    res.render("updatebook", { book });

  } catch (error) {
    console.error("Error fetching Book:", error);
    res.status(500).render("error");
  }
};

// Handle POST request to update the book
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre } = req.body;
    const updatedBookData = { title, author, genre };

    // Update the book with the new data
    const updatedBook = await Book.findOneAndUpdate({ _id: id }, updatedBookData, { new: true });

    if (!updatedBook) {
      return res.render("notfound");
    }

    // console.log("Book updated successfully");

    // Redirect to /
    res.redirect("/");

  } catch (error) {
    console.error("Error updating Book:", error);
    res.status(500).render("error");
  }
};

module.exports = {
  renderBooks,
  renderBook,
  addBook,
  renderForm,
  deleteBook,
  updateBook,
  renderUpdateBook,
};
