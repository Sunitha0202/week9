const Location = require("../models/locationModel");

// get all Locations
const getLocations = async (req, res) => {
  try {
    const loactions = await Location.find({});
    res.status(200).json(loactions);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Add one Location
const addLocation = async (req, res) => {
  // console.log();
  try {
    const { name, address, longitude, latitude } = req.body;
    const newLocation = new Location({ name, address, longitude, latitude  });
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get Location by ID
const getLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const loaction = await Location.findById(id);
    if (!loaction) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.status(200).json(loaction);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete Location by ID
const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const loaction = await Location.findByIdAndDelete({ _id: id });
    if (!loaction) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.status(200).json({ message: "Location deleted successfully" });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete all Locations
const deleteAllLocations = async (req, res) => {
  try {
    const result = await Location.deleteMany({});
    res
      .status(200)
      .json({ message: `Deleted ${result.deletedCount} books successfully` });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Update Location by ID
const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLocation = req.body;
    // const loaction = await Location.findOneAndUpdate({ _id: id }, updatedLocation);
    const loaction = await Location.findOneAndUpdate({ _id: id }, updatedLocation, { new: true });

    if (!loaction) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.status(200).json(loaction);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getLocations,
  addLocation,
  getLocation,
  deleteLocation,
  deleteAllLocations,
  updateLocation,
};
