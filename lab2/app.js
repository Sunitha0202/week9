const express = require("express");
const app = express();
const methodOverride = require('method-override')

const connectDB = require("./config/db");
const logger = require("./middlewares/logger")

const blogAPI = require("./controllers/locationAPIController");
const blogSSR = require("./controllers/locationSSRController");
 
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

// End1: Route to render index.html with locations using EJS
app.get("/", blogSSR.renderLocations);
// End2: Define a route to render the addlocation.ejs view
app.get("/addlocation", blogSSR.renderForm);
// End3:Route to add  location using EJ
app.post("/addlocation", blogSSR.addLocation);
// Define a route to render the singlelocation.ejs view
app.get("/single-location/:id", blogSSR.renderLocation);
// Define a route to delete singlelocation
app.delete("/single-location/:id", blogSSR.deleteLocation);
// Define a route to update single location.ejs
app.put("/single-location/:id", blogSSR.updateLocation);
// Define location to update
app.get("/single-location/update/:id", blogSSR.renderUpdateLocation);

// API
// GET all Locations
app.get("/api/locations", blogAPI.getLocations);
// POST a new Location
app.post("/api/locations", blogAPI.addLocation);
// GET a single Location
app.get("/api/locations/:id", blogAPI.getLocation);

// Update Location using PUT
app.put("/api/locations/:id", blogAPI.updateLocation);
// DELETE a Location
app.delete("/api/locations/:id", blogAPI.deleteLocation);
// DELETE all Location
app.delete("/api/locations", blogAPI.deleteAllLocations);

const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
