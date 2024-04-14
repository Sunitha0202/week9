#!/bin/bash

# Define variables
ROOT="."
WEEK="week9"
LAB="lab-3"
DATA_MODEL="contact"
CAMEL_CASE_MODEL="$(sed 's/.*/\u&/' <<< "$DATA_MODEL")" # Convert to camel case
DIRECTORY="$ROOT/$WEEK/$LAB" # Define the DIRECTORY variable

# Create the necessary directories
mkdir -p "$DIRECTORY/config" "$DIRECTORY/controllers" "$DIRECTORY/models" "$DIRECTORY/public/css" "$DIRECTORY/views" "$DIRECTORY/middlewares"

# Create the files with dynamic names
touch "$DIRECTORY/config/db.js"
touch "$DIRECTORY/controllers/${DATA_MODEL}APIController.js"
touch "$DIRECTORY/controllers/${DATA_MODEL}SSRController.js"
touch "$DIRECTORY/models/${DATA_MODEL}Model.js"
touch "$DIRECTORY/public/css/styles.css"
touch "$DIRECTORY/views/index.ejs"
touch "$DIRECTORY/views/add${DATA_MODEL}.ejs" # Lowercase file name
touch "$DIRECTORY/views/single${DATA_MODEL}.ejs"
touch "$DIRECTORY/views/update${DATA_MODEL}.ejs"
touch "$DIRECTORY/views/error.ejs"
touch "$DIRECTORY/views/notfound.ejs"
touch "$DIRECTORY/views/partials/head.ejs"
touch "$DIRECTORY/views/partials/footer.ejs"
touch "$DIRECTORY/views/partials/navbar.ejs"
touch "$DIRECTORY/middlewares/logger.js"
touch "$DIRECTORY/app.js"
touch "$DIRECTORY/package.json"


# Create and add content to the files
cat <<EOF > "$DIRECTORY/config/db.js"
const mongoose = require("mongoose");

const MONGO_URI = "mongodb://localhost:27017/fullstack-course";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
EOF

echo 'const express = require("express");
const app = express();
const methodOverride = require('method-override')

const connectDB = require("./config/db");
const logger = require("./middlewares/logger")

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

// API


const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});' > "$DIRECTORY/app.js"


echo 'const logger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  console.log("-----");
  next();
};

module.exports = logger;
' > "$DIRECTORY/middlewares/logger.js"

echo '{
  "name": "lab",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start":"node app.js",
    "dev": "nodemon app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}' > "$DIRECTORY/package.json"


# Check if the OS is Windows (MINGW)
if [[ $(uname -s) =~ ^MINGW ]]; then
    echo "Changing directory to $DIRECTORY"
    cd "$DIRECTORY" || exit

    echo "Installing required packages with npm..."
    npm install express mongoose ejs method-override

    echo "Installing nodemon as a dev dependency..."
    npm install nodemon -D

    echo "Thank you for using this script! Packages installation completed successfully."
else
    echo "Thank you for using this script!"
fi