const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  method: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model('Payment', paymentSchema);