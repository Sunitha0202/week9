const express = require("express");
const app = express();
const methodOverride = require('method-override')

const connectDB = require("./config/db");
const logger = require("./middlewares/logger")

const blogAPI = require("./controllers/sleeplogAPIController");
const blogSSR = require("./controllers/sleeplogSSRController");
 
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

// End1: Route to render index.html with sleeplogs using EJS
app.get("/", blogSSR.renderSleeplogs);
// End2: Define a route to render the addsleeplog.ejs view
app.get("/addsleeplog", blogSSR.renderForm);
// End3:Route to add  sleeplog using EJ
app.post("/addsleeplog", blogSSR.addSleeplog);
// Define a route to render the singlesleeplog.ejs view
app.get("/single-sleeplog/:id", blogSSR.renderSleeplog);
// Define a route to delete singlesleeplog
app.delete("/single-sleeplog/:id", blogSSR.deleteSleeplog);
// Define a route to update single sleeplog.ejs
app.put("/single-sleeplog/:id", blogSSR.updateSleeplog);
// Define sleeplog to update
app.get("/single-sleeplog/update/:id", blogSSR.renderUpdateSleeplog);

// API
// GET all Sleeplogs
app.get("/api/sleeplogs", blogAPI.getSleeplogs);
// POST a new Sleeplog
app.post("/api/sleeplogs", blogAPI.addSleeplog);
// GET a single Sleeplog
app.get("/api/sleeplogs/:id", blogAPI.getSleeplog);

// Update Sleeplog using PUT
app.put("/api/sleeplogs/:id", blogAPI.updateSleeplog);
// DELETE a Sleeplog
app.delete("/api/sleeplogs/:id", blogAPI.deleteSleeplog);
// DELETE all Sleeplog
app.delete("/api/sleeplogs", blogAPI.deleteAllSleeplogs);

const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
