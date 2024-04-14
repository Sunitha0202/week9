const express = require("express");
const app = express();
const methodOverride = require('method-override')

const connectDB = require("./config/db");
const logger = require("./middlewares/logger")

const blogAPI = require("./controllers/messageAPIController");
const blogSSR = require("./controllers/messageSSRController");
 
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

// End1: Route to render index.html with messages using EJS
app.get("/", blogSSR.renderMessages);
// End2: Define a route to render the addmessage.ejs view
app.get("/addmessage", blogSSR.renderForm);
// End3:Route to add  message using EJ
app.post("/addmessage", blogSSR.addMessage);
// Define a route to render the singlemessage.ejs view
app.get("/single-message/:id", blogSSR.renderMessage);
// Define a route to delete singlemessage
app.delete("/single-message/:id", blogSSR.deleteMessage);
// Define a route to update single message.ejs
app.put("/single-message/:id", blogSSR.updateMessage);
// Define message to update
app.get("/single-message/update/:id", blogSSR.renderUpdateMessage);

// API
// GET all Messages
app.get("/api/messages", blogAPI.getMessages);
// POST a new Message
app.post("/api/messages", blogAPI.addMessage);
// GET a single Message
app.get("/api/messages/:id", blogAPI.getMessage);

// Update Message using PUT
app.put("/api/messages/:id", blogAPI.updateMessage);
// DELETE a Message
app.delete("/api/messages/:id", blogAPI.deleteMessage);
// DELETE all Message
app.delete("/api/messages", blogAPI.deleteAllMessages);

const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});