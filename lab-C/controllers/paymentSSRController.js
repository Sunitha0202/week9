const Payment = require("../models/paymentModel");

// Render Controller: Render index.html with payments using EJS
const renderPayments = async (req, res) => {
  try {
    const payments = await Payment.find({});
    res.render("index", { payments }); // Render index.ejs with payments data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};

// Get Payment by ID
const renderPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findById(id);
    if (!payment) {
      return res.render("notfound");
    }
    res.render("singlepayment", { payment }); // Render index.ejs with 
  } catch (error) {
    console.error("Error rendering Payment:", error);
    res.status(500).render("error");
  }
};
 
const renderForm = (req, res) => {
  try {
    res.render("addpayment"); // Assuming "addpayment.ejs" is located in the "views" directory
  } catch (error) {
    console.error("Error rendering form", error);
    res.status(500).render("error");
  }
};

// Controller function to handle adding a new payment (used for rendering and API)
const addPayment = async (req, res) => {
  try {
    const { amount, method, status } = req.body;
    // Convert the achieved field to a Boolean
    const achieved = req.body.achieved === "on";
    const newPayment = new Payment({ amount, method, status });
    await newPayment.save();
    // Redirect to the main page after successfully adding the payment
    console.log("Payment added successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error adding payment:", error);
    res.status(500).render("error");
  }
};

// Delete Payment by ID
const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByIdAndDelete({ _id: id });
    if (!payment) {
      return res.status(404).render("notfound");
    }
    console.log("Payment delted successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error deleteing Payment:", error);
    res.status(500).render("error");
  }
};


// Update Payment by ID
const renderUpdatePayment = async (req, res) => {
  try {
    const { id } = req.params;
     
    // Fetch the payment by id
    const payment = await Payment.findById(id);

    if (!payment) {
      return res.render("notfound");
    }

    // Render the singlepayment.ejs template with the payment data
    res.render("updatepayment", { payment });

  } catch (error) {
    console.error("Error fetching Payment:", error);
    res.status(500).render("error");
  }
};

// Handle POST request to update the payment
const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const achieved = req.body.achieved === "on";
    const { amount, method, status } = req.body;
    const updatedPaymentData = { amount, method, status };

    // Update the payment with the new data
    const updatedPayment = await Payment.findOneAndUpdate({ _id: id }, updatedPaymentData, { new: true });

    if (!updatedPayment) {
      return res.render("notfound");
    }

    // console.log("Payment updated successfully");

    // Redirect to /
    res.redirect("/");

  } catch (error) {
    console.error("Error updating Payment:", error);
    res.status(500).render("error");
  }
};

module.exports = {
  renderPayments,
  renderPayment,
  addPayment,
  renderForm,
  deletePayment,
  updatePayment,
  renderUpdatePayment,
};