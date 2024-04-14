const Sleeplog = require("../models/sleeplogModel");

// get all Sleeplogs
const getSleeplogs = async (req, res) => {
  try {
    const sleeplog = await Sleeplog.find({});
    res.status(200).json(sleeplog);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Add one Sleeplog
const addSleeplog = async (req, res) => {
  // console.log();
  try {
    const { date, hoursSlept, quality, comments } = req.body;
    const newSleeplog = new Sleeplog({ date, hoursSlept, quality, comments });
    await newSleeplog.save();
    res.status(201).json(newSleeplog);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get Sleeplog by ID
const getSleeplog = async (req, res) => {
  try {
    const { id } = req.params;
    const sleeplog = await Sleeplog.findById(id);
    if (!sleeplog) {
      return res.status(404).json({ message: "Sleeplog not found" });
    }
    res.status(200).json(sleeplog);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete Sleeplog by ID
const deleteSleeplog = async (req, res) => {
  try {
    const { id } = req.params;
    const sleeplog = await Sleeplog.findByIdAndDelete({ _id: id });
    if (!sleeplog) {
      return res.status(404).json({ message: "Sleeplog not found" });
    }
    res.status(200).json({ message: "Sleeplog deleted successfully" });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete all Sleeplogs
const deleteAllSleeplogs = async (req, res) => {
  try {
    const result = await Sleeplog.deleteMany({});
    res
      .status(200)
      .json({ message: `Deleted ${result.deletedCount} books successfully` });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Update Sleeplog by ID
const updateSleeplog = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSleeplog = req.body;
    // const sleeplog = await Sleeplog.findOneAndUpdate({ _id: id }, updatedSleeplog);
    const sleeplog = await Sleeplog.findOneAndUpdate({ _id: id }, updatedSleeplog, { new: true });

    if (!sleeplog) {
      return res.status(404).json({ message: "Sleeplog not found" });
    }
    res.status(200).json(sleeplog);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getSleeplogs,
  addSleeplog,
  getSleeplog,
  deleteSleeplog,
  deleteAllSleeplogs,
  updateSleeplog,
};