const Payment = require("../models/paymentModel");

// get all Payments
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({});
    res.status(200).json(payments);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Add one Payment
const addPayment = async (req, res) => {
  // console.log();
  try {
    const { amount, method, status } = req.body;
    const newPayment = new Payment({ amount, method, status });
    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get Payment by ID
const getPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findById(id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete Payment by ID
const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByIdAndDelete({ _id: id });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete all Payments
const deleteAllPayments = async (req, res) => {
  try {
    const result = await Payment.deleteMany({});
    res
      .status(200)
      .json({ message: `Deleted ${result.deletedCount} books successfully` });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Update Payment by ID
const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPayment = req.body;
    // const payment = await Payment.findOneAndUpdate({ _id: id }, updatedPayment);
    const payment = await Payment.findOneAndUpdate({ _id: id }, updatedPayment, { new: true });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getPayments,
  addPayment,
  getPayment,
  deletePayment,
  deleteAllPayments,
  updatePayment,
};