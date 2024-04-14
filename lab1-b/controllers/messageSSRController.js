const Message = require("../models/messageModel");

// Render Controller: Render index.html with messages using EJS
const renderMessages = async (req, res) => {
  try {
    const messages = await Message.find({});
    res.render("index", { messages }); // Render index.ejs with messages data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};

// Get Message by ID
const renderMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findById(id);
    if (!message) {
      return res.render("notfound");
    }
    res.render("singlemessage", { message }); // Render index.ejs with 
  } catch (error) {
    console.error("Error rendering Message:", error);
    res.status(500).render("error");
  }
};
 
const renderForm = (req, res) => {
  try {
    res.render("addmessage"); // Assuming "addmessage.ejs" is located in the "views" directory
  } catch (error) {
    console.error("Error rendering form", error);
    res.status(500).render("error");
  }
};

// Controller function to handle adding a new message (used for rendering and API)
const addMessage = async (req, res) => {
  try {
    const { sender, recipient, content } = req.body;
    
    const newMessage = new Message({ sender, recipient, content });
    await newMessage.save();
    // Redirect to the main page after successfully adding the message
    console.log("Message added successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).render("error");
  }
};

// Delete Message by ID
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findByIdAndDelete({ _id: id });
    if (!message) {
      return res.status(404).render("notfound");
    }
    console.log("Message delted successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error deleteing Message:", error);
    res.status(500).render("error");
  }
};


// Update Message by ID
const renderUpdateMessage = async (req, res) => {
  try {
    const { id } = req.params;
     
    // Fetch the message by id
    const message = await Message.findById(id);

    if (!message) {
      return res.render("notfound");
    }

    // Render the singlemessage.ejs template with the message data
    res.render("updatemessage", { message });

  } catch (error) {
    console.error("Error fetching Message:", error);
    res.status(500).render("error");
  }
};

// Handle POST request to update the message
const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { sender, recipient, content } = req.body;
    const updatedMessageData = { sender, recipient, content };

    // Update the message with the new data
    const updatedMessage = await Message.findOneAndUpdate({ _id: id }, updatedMessageData, { new: true });

    if (!updatedMessage) {
      return res.render("notfound");
    }

    // console.log("Message updated successfully");

    // Redirect to /
    res.redirect("/");

  } catch (error) {
    console.error("Error updating Message:", error);
    res.status(500).render("error");
  }
};

module.exports = {
  renderMessages,
  renderMessage,
  addMessage,
  renderForm,
  deleteMessage,
  updateMessage,
  renderUpdateMessage,
};