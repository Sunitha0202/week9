const express = require("express");
const app = express();
const methodOverride = require('method-override')

const connectDB = require("./config/db");
const logger = require("./middlewares/logger")

const blogAPI = require("./controllers/goalAPIController");
const blogSSR = require("./controllers/goalSSRController");
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.use(logger) 

// Set views directory for EJS templates
app.set("views", "views");
// Set EJS as the view engine
app.set("view engine", "ejs");
// Serve static files from the "public" directory
app.use(express.static("public"));

// Connect to MongoDB
connectDB();
 
// SSR

// End1: Route to render index.html with goals using EJS
app.get("/", blogSSR.renderGoals);
// End2: Define a route to render the addgoal.ejs view
app.get("/addgoal", blogSSR.renderForm);
// End3:Route to add  goal using EJ
app.post("/addgoal", blogSSR.addGoal);
// Define a route to render the singlegoal.ejs view
app.get("/single-goal/:id", blogSSR.renderGoal);
// Define a route to delete singlegoal
app.delete("/single-goal/:id", blogSSR.deleteGoal);
// Define a route to update single goal.ejs
app.put("/single-goal/:id", blogSSR.updateGoal);
// Define goal to update
app.get("/single-goal/update/:id", blogSSR.renderUpdateGoal);

// API
// GET all Goals
app.get("/api/goals", blogAPI.getGoals);
// POST a new Goal
app.post("/api/goals", blogAPI.addGoal);
// GET a single Goal
app.get("/api/goals/:id", blogAPI.getGoal);

// Update Goal using PUT
app.put("/api/goals/:id", blogAPI.updateGoal);
// DELETE a Goal
app.delete("/api/goals/:id", blogAPI.deleteGoal);
// DELETE all Goal
app.delete("/api/goals", blogAPI.deleteAllGoals);

const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});