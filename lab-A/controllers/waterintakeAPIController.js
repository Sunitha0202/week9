const Waterintake = require("../models/waterintakeModel");

// get all Waterintakes
const getWaterintakes = async (req, res) => {
  try {
    const waterintakes = await Waterintake.find({});
    res.status(200).json(waterintakes);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Add one Waterintake
const addWaterintake = async (req, res) => {
  // console.log();
  try {
    const { date, amountInLiters, comments } = req.body;
    const newWaterintake = new Waterintake({ date, amountInLiters, comments });
    await newWaterintake.save();
    res.status(201).json(newWaterintake);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get Waterintake by ID
const getWaterintake = async (req, res) => {
  try {
    const { id } = req.params;
    const waterintake = await Waterintake.findById(id);
    if (!waterintake) {
      return res.status(404).json({ message: "Waterintake not found" });
    }
    res.status(200).json(waterintake);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete Waterintake by ID
const deleteWaterintake = async (req, res) => {
  try {
    const { id } = req.params;
    const waterintake = await Waterintake.findByIdAndDelete({ _id: id });
    if (!waterintake) {
      return res.status(404).json({ message: "Waterintake not found" });
    }
    res.status(200).json({ message: "Waterintake deleted successfully" });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete all Waterintakes
const deleteAllWaterintakes = async (req, res) => {
  try {
    const result = await Waterintake.deleteMany({});
    res
      .status(200)
      .json({ message: `Deleted ${result.deletedCount} books successfully` });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Update Waterintake by ID
const updateWaterintake = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedWaterintake = req.body;
    // const waterintake = await Waterintake.findOneAndUpdate({ _id: id }, updatedWaterintake);
    const waterintake = await Waterintake.findOneAndUpdate({ _id: id }, updatedWaterintake, { new: true });

    if (!waterintake) {
      return res.status(404).json({ message: "Waterintake not found" });
    }
    res.status(200).json(waterintake);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getWaterintakes,
  addWaterintake,
  getWaterintake,
  deleteWaterintake,
  deleteAllWaterintakes,
  updateWaterintake,
};
