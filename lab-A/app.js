const express = require("express");
const app = express();
const methodOverride = require('method-override')

const connectDB = require("./config/db");
const logger = require("./middlewares/logger")

const blogAPI = require("./controllers/waterintakeAPIController");
const blogSSR = require("./controllers/waterintakeSSRController");
 
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

// End1: Route to render index.html with waterintakes using EJS
app.get("/", blogSSR.renderWaterintakes);
// End2: Define a route to render the addwaterintake.ejs view
app.get("/addwaterintake", blogSSR.renderForm);
// End3:Route to add  waterintake using EJ
app.post("/addwaterintake", blogSSR.addWaterintake);
// Define a route to render the singlewaterintake.ejs view
app.get("/single-waterintake/:id", blogSSR.renderWaterintake);
// Define a route to delete singlewaterintake
app.delete("/single-waterintake/:id", blogSSR.deleteWaterintake);
// Define a route to update single waterintake.ejs
app.put("/single-waterintake/:id", blogSSR.updateWaterintake);
// Define waterintake to update
app.get("/single-waterintake/update/:id", blogSSR.renderUpdateWaterintake);

// API
// GET all Waterintakes
app.get("/api/waterintakes", blogAPI.getWaterintakes);
// POST a new Waterintake
app.post("/api/waterintakes", blogAPI.addWaterintake);
// GET a single Waterintake
app.get("/api/waterintakes/:id", blogAPI.getWaterintake);

// Update Waterintake using PUT
app.put("/api/waterintakes/:id", blogAPI.updateWaterintake);
// DELETE a Waterintake
app.delete("/api/waterintakes/:id", blogAPI.deleteWaterintake);
// DELETE all Waterintake
app.delete("/api/waterintakes", blogAPI.deleteAllWaterintakes);

const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});