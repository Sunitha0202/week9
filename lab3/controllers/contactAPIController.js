const Contact = require("../models/contactModel");

// get all Contacts
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Add one Contact
const addContact = async (req, res) => {
  // console.log();
  try {
    const { firstName, lastName, email, phone, adress } = req.body;
    const newContact = new Contact({ firstName, lastName, email, phone, adress });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get Contact by ID
const getContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ contact: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete Contact by ID
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete({ _id: id });
    if (!contact) {
      return res.status(404).json({ contact: "Contact not found" });
    }
    res.status(200).json({ contact: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete all Contacts
const deleteAllContacts = async (req, res) => {
  try {
    const result = await Contact.deleteMany({});
    res
      .status(200)
      .json({ contact: `Deleted ${result.deletedCount} books successfully` });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Update Contact by ID
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedContact = req.body;
    // const contact = await Contact.findOneAndUpdate({ _id: id }, updatedContact);
    const contact = await Contact.findOneAndUpdate({ _id: id }, updatedContact, { new: true });

    if (!contact) {
      return res.status(404).json({ contact: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getContacts,
  addContact,
  getContact,
  deleteContact,
  deleteAllContacts,
  updateContact,
};