const Sleeplog = require("../models/sleeplogModel");

// Render Controller: Render index.html with sleeplog using EJS
const renderSleeplogs = async (req, res) => {
  try {
    const sleeplog = await Sleeplog.find({});
    res.render("index", { sleeplog }); // Render index.ejs with sleeplog data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};

// Get Sleeplog by ID
const renderSleeplog = async (req, res) => {
  try {
    const { id } = req.params;
    const sleeplog = await Sleeplog.findById(id);
    if (!sleeplog) {
      return res.render("notfound");
    }
    res.render("singlesleeplog", { sleeplog }); // Render index.ejs with 
  } catch (error) {
    console.error("Error rendering Sleeplog:", error);
    res.status(500).render("error");
  }
};
 
const renderForm = (req, res) => {
  try {
    res.render("addsleeplog"); // Assuming "addsleeplog.ejs" is located in the "views" directory
  } catch (error) {
    console.error("Error rendering form", error);
    res.status(500).render("error");
  }
};

// Controller function to handle adding a new sleeplog (used for rendering and API)
const addSleeplog = async (req, res) => {
  try {
    const { date, hoursSlept, quality, comments } = req.body;
    // Convert the achieved field to a Boolean
    const achieved = req.body.achieved === "on";
    const newSleeplog = new Sleeplog({ date, hoursSlept, quality, comments });
    await newSleeplog.save();
    // Redirect to the main page after successfully adding the sleeplog
    console.log("Sleeplog added successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error adding sleeplog:", error);
    res.status(500).render("error");
  }
};

// Delete Sleeplog by ID
const deleteSleeplog = async (req, res) => {
  try {
    const { id } = req.params;
    const sleeplog = await Sleeplog.findByIdAndDelete({ _id: id });
    if (!sleeplog) {
      return res.status(404).render("notfound");
    }
    console.log("Sleeplog delted successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error deleteing Sleeplog:", error);
    res.status(500).render("error");
  }
};


// Update Sleeplog by ID
const renderUpdateSleeplog = async (req, res) => {
  try {
    const { id } = req.params;
     
    // Fetch the sleeplog by id
    const sleeplog = await Sleeplog.findById(id);

    if (!sleeplog) {
      return res.render("notfound");
    }

    // Render the singlesleeplog.ejs template with the sleeplog data
    res.render("updatesleeplog", { sleeplog });

  } catch (error) {
    console.error("Error fetching Sleeplog:", error);
    res.status(500).render("error");
  }
};

// Handle POST request to update the sleeplog
const updateSleeplog = async (req, res) => {
  try {
    const { id } = req.params;
    const achieved = req.body.achieved === "on";
    const { date, hoursSlept, quality, comments } = req.body;
    const updatedSleeplogData = { date, hoursSlept, quality, comments };

    // Update the sleeplog with the new data
    const updatedSleeplog = await Sleeplog.findOneAndUpdate({ _id: id }, updatedSleeplogData, { new: true });

    if (!updatedSleeplog) {
      return res.render("notfound");
    }

    // console.log("Sleeplog updated successfully");

    // Redirect to /
    res.redirect("/");

  } catch (error) {
    console.error("Error updating Sleeplog:", error);
    res.status(500).render("error");
  }
};

module.exports = {
  renderSleeplogs,
  renderSleeplog,
  addSleeplog,
  renderForm,
  deleteSleeplog,
  updateSleeplog,
  renderUpdateSleeplog,
};