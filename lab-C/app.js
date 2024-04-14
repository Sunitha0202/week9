const express = require("express");
const app = express();
const methodOverride = require('method-override')

const connectDB = require("./config/db");
const logger = require("./middlewares/logger")

const blogAPI = require("./controllers/paymentAPIController");
const blogSSR = require("./controllers/paymentSSRController");
 
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

// End1: Route to render index.html with payments using EJS
app.get("/", blogSSR.renderPayments);
// End2: Define a route to render the addpayment.ejs view
app.get("/addpayment", blogSSR.renderForm);
// End3:Route to add  payment using EJ
app.post("/addpayment", blogSSR.addPayment);
// Define a route to render the singlepayment.ejs view
app.get("/single-payment/:id", blogSSR.renderPayment);
// Define a route to delete singlepayment
app.delete("/single-payment/:id", blogSSR.deletePayment);
// Define a route to update single payment.ejs
app.put("/single-payment/:id", blogSSR.updatePayment);
// Define payment to update
app.get("/single-payment/update/:id", blogSSR.renderUpdatePayment);

// API
// GET all Payments
app.get("/api/payments", blogAPI.getPayments);
// POST a new Payment
app.post("/api/payments", blogAPI.addPayment);
// GET a single Payment
app.get("/api/payments/:id", blogAPI.getPayment);

// Update Payment using PUT
app.put("/api/payments/:id", blogAPI.updatePayment);
// DELETE a Payment
app.delete("/api/payments/:id", blogAPI.deletePayment);
// DELETE all Payment
app.delete("/api/payments", blogAPI.deleteAllPayments);

const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});