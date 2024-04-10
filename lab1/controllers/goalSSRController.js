const Goal = require("../models/goalModel");

// Render Controller: Render index.html with goals using EJS
const renderGoals = async (req, res) => {
  try {
    const goals = await Goal.find({});
    res.render("index", { goals }); // Render index.ejs with goals data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};

// Get Goal by ID
const renderGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await Goal.findById(id);
    if (!goal) {
      return res.render("notfound");
    }
    res.render("singlegoal", { goal }); // Render index.ejs with 
  } catch (error) {
    console.error("Error rendering Goal:", error);
    res.status(500).render("error");
  }
};
 
const renderForm = (req, res) => {
  try {
    res.render("addgoal"); // Assuming "addgoal.ejs" is located in the "views" directory
  } catch (error) {
    console.error("Error rendering form", error);
    res.status(500).render("error");
  }
};

// Controller function to handle adding a new goal (used for rendering and API)
const addGoal = async (req, res) => {
  try {
    const { title, description, targetDate } = req.body;
    // Convert the achieved field to a Boolean
    const achieved = req.body.achieved === "on";
    const newGoal = new Goal({ title, description, targetDate, achieved });
    await newGoal.save();
    // Redirect to the main page after successfully adding the goal
    console.log("Goal added successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error adding goal:", error);
    res.status(500).render("error");
  }
};

// Delete Goal by ID
const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await Goal.findByIdAndDelete({ _id: id });
    if (!goal) {
      return res.status(404).render("notfound");
    }
    console.log("Goal delted successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error deleteing Goal:", error);
    res.status(500).render("error");
  }
};


// Update Goal by ID
const renderUpdateGoal = async (req, res) => {
  try {
    const { id } = req.params;
     
    // Fetch the goal by id
    const goal = await Goal.findById(id);

    if (!goal) {
      return res.render("notfound");
    }

    // Render the singlegoal.ejs template with the goal data
    res.render("updategoal", { goal });

  } catch (error) {
    console.error("Error fetching Goal:", error);
    res.status(500).render("error");
  }
};

// Handle POST request to update the goal
const updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const achieved = req.body.achieved === "on";
    const { title, description, targetDate } = req.body;
    const updatedGoalData = { title, description, targetDate, achieved };

    // Update the goal with the new data
    const updatedGoal = await Goal.findOneAndUpdate({ _id: id }, updatedGoalData, { new: true });

    if (!updatedGoal) {
      return res.render("notfound");
    }

    // console.log("Goal updated successfully");

    // Redirect to /
    res.redirect("/");

  } catch (error) {
    console.error("Error updating Goal:", error);
    res.status(500).render("error");
  }
};

module.exports = {
  renderGoals,
  renderGoal,
  addGoal,
  renderForm,
  deleteGoal,
  updateGoal,
  renderUpdateGoal,
};