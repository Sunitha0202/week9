const Contact = require("../models/contactModel");

// Render Controller: Render index.html with contacts using EJS
const renderContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.render("index", { contacts }); // Render index.ejs with contacts data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};

// Get Contact by ID
const renderContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.render("notfound");
    }
    res.render("singlecontact", { contact }); // Render index.ejs with 
  } catch (error) {
    console.error("Error rendering Contact:", error);
    res.status(500).render("error");
  }
};
 
const renderForm = (req, res) => {
  try {
    res.render("addcontact"); // Assuming "addcontact.ejs" is located in the "views" directory
  } catch (error) {
    console.error("Error rendering form", error);
    res.status(500).render("error");
  }
};

// Controller function to handle adding a new contact (used for rendering and API)
const addContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, adress } = req.body;
    // Convert the achieved field to a Boolean
    const achieved = req.body.achieved === "on";
    const newContact = new Contact({ firstName, lastName, email, phone, adress });
    await newContact.save();
    // Redirect to the main page after successfully adding the contact
    console.log("Contact added successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error adding contact:", error);
    res.status(500).render("error");
  }
};

// Delete Contact by ID
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete({ _id: id });
    if (!contact) {
      return res.status(404).render("notfound");
    }
    console.log("Contact delted successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error deleteing Contact:", error);
    res.status(500).render("error");
  }
};


// Update Contact by ID
const renderUpdateContact = async (req, res) => {
  try {
    const { id } = req.params;
     
    // Fetch the contact by id
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.render("notfound");
    }

    // Render the singlecontact.ejs template with the contact data
    res.render("updatecontact", { contact });

  } catch (error) {
    console.error("Error fetching Contact:", error);
    res.status(500).render("error");
  }
};

// Handle POST request to update the contact
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const achieved = req.body.achieved === "on";
    const { firstName, lastName, email, phone, adress } = req.body;
    const updatedContactData = { firstName, lastName, email, phone, adress };

    // Update the contact with the new data
    const updatedContact = await Contact.findOneAndUpdate({ _id: id }, updatedContactData, { new: true });

    if (!updatedContact) {
      return res.render("notfound");
    }

    // console.log("Contact updated successfully");

    // Redirect to /
    res.redirect("/");

  } catch (error) {
    console.error("Error updating Contact:", error);
    res.status(500).render("error");
  }
};

module.exports = {
  renderContacts,
  renderContact,
  addContact,
  renderForm,
  deleteContact,
  updateContact,
  renderUpdateContact,
};