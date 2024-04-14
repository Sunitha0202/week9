const Waterintake = require("../models/waterintakeModel");

// Render Controller: Render index.html with waterintakes using EJS
const renderWaterintakes = async (req, res) => {
  try {
    const waterintakes = await Waterintake.find({});
    res.render("index", { waterintakes }); // Render index.ejs with waterintakes data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};

// Get Waterintake by ID
const renderWaterintake = async (req, res) => {
  try {
    const { id } = req.params;
    const waterintake = await Waterintake.findById(id);
    if (!waterintake) {
      return res.render("notfound");
    }
    res.render("singlewaterintake", { waterintake }); // Render index.ejs with 
  } catch (error) {
    console.error("Error rendering Waterintake:", error);
    res.status(500).render("error");
  }
};
 
const renderForm = (req, res) => {
  try {
    res.render("addwaterintake"); // Assuming "addwaterintake.ejs" is located in the "views" directory
  } catch (error) {
    console.error("Error rendering form", error);
    res.status(500).render("error");
  }
};

// Controller function to handle adding a new waterintake (used for rendering and API)
const addWaterintake = async (req, res) => {
  try {
    const { date, amountInLiters, comments } = req.body;
    // Convert the achieved field to a Boolean
    const achieved = req.body.achieved === "on";
    const newWaterintake = new Waterintake({ date, amountInLiters, comments });
    await newWaterintake.save();
    // Redirect to the main page after successfully adding the waterintake
    console.log("Waterintake added successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error adding waterintake:", error);
    res.status(500).render("error");
  }
};

// Delete Waterintake by ID
const deleteWaterintake = async (req, res) => {
  try {
    const { id } = req.params;
    const waterintake = await Waterintake.findByIdAndDelete({ _id: id });
    if (!waterintake) {
      return res.status(404).render("notfound");
    }
    console.log("Waterintake delted successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error deleteing Waterintake:", error);
    res.status(500).render("error");
  }
};


// Update Waterintake by ID
const renderUpdateWaterintake = async (req, res) => {
  try {
    const { id } = req.params;
     
    // Fetch the waterintake by id
    const waterintake = await Waterintake.findById(id);

    if (!waterintake) {
      return res.render("notfound");
    }

    // Render the singlewaterintake.ejs template with the waterintake data
    res.render("updatewaterintake", { waterintake });

  } catch (error) {
    console.error("Error fetching Waterintake:", error);
    res.status(500).render("error");
  }
};

// Handle POST request to update the waterintake
const updateWaterintake = async (req, res) => {
  try {
    const { id } = req.params;
    const achieved = req.body.achieved === "on";
    const { date, amountInLiters, comments } = req.body;
    const updatedWaterintakeData = { date, amountInLiters, comments };

    // Update the waterintake with the new data
    const updatedWaterintake = await Waterintake.findOneAndUpdate({ _id: id }, updatedWaterintakeData, { new: true });

    if (!updatedWaterintake) {
      return res.render("notfound");
    }

    // console.log("Waterintake updated successfully");

    // Redirect to /
    res.redirect("/");

  } catch (error) {
    console.error("Error updating Waterintake:", error);
    res.status(500).render("error");
  }
};

module.exports = {
  renderWaterintakes,
  renderWaterintake,
  addWaterintake,
  renderForm,
  deleteWaterintake,
  updateWaterintake,
  renderUpdateWaterintake,
};

