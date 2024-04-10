const Location = require("../models/locationModel");

// Render Controller: Render index.html with locations using EJS
const renderLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.render("index", { locations }); // Render index.ejs with locations data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};

// Get Location by ID
const renderLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await Location.findById(id);
    if (!location) {
      return res.render("notfound");
    }
    res.render("singlelocation", { location }); // Render index.ejs with 
  } catch (error) {
    console.error("Error rendering Location:", error);
    res.status(500).render("error");
  }
};
 
const renderForm = (req, res) => {
  try {
    res.render("addlocation"); // Assuming "addlocation.ejs" is located in the "views" directory
  } catch (error) {
    console.error("Error rendering form", error);
    res.status(500).render("error");
  }
};

// Controller function to handle adding a new location (used for rendering and API)
const addLocation = async (req, res) => {
  try {
    const { name, address, longitude, latitude } = req.body;
    // Convert the achieved field to a Boolean
    const achieved = req.body.achieved === "on";
    const newLocation = new Location({  name, address, longitude, latitude });
    await newLocation.save();
    // Redirect to the main page after successfully adding the location
    console.log("Location added successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error adding location:", error);
    res.status(500).render("error");
  }
};

// Delete Location by ID
const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await Location.findByIdAndDelete({ _id: id });
    if (!location) {
      return res.status(404).render("notfound");
    }
    console.log("Location delted successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error deleteing Location:", error);
    res.status(500).render("error");
  }
};


// Update Location by ID
const renderUpdateLocation = async (req, res) => {
  try {
    const { id } = req.params;
     
    // Fetch the location by id
    const location = await Location.findById(id);

    if (!location) {
      return res.render("notfound");
    }

    // Render the singlelocation.ejs template with the location data
    res.render("updatelocation", { location });

  } catch (error) {
    console.error("Error fetching Location:", error);
    res.status(500).render("error");
  }
};

// Handle POST request to update the location
const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const {  name, address, longitude, latitude } = req.body;
    const updatedLocationData = {  name, address, longitude, latitude };

    // Update the location with the new data
    const updatedLocation = await Location.findOneAndUpdate({ _id: id }, updatedLocationData, { new: true });

    if (!updatedLocation) {
      return res.render("notfound");
    }

    // console.log("Location updated successfully");

    // Redirect to /
    res.redirect("/");

  } catch (error) {
    console.error("Error updating Location:", error);
    res.status(500).render("error");
  }
};

module.exports = {
  renderLocations,
  renderLocation,
  addLocation,
  renderForm,
  deleteLocation,
  updateLocation,
  renderUpdateLocation,
};
