const mongoose = require('mongoose');

const waterintakeSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    amountInLiters: { type: Number, required: true },
    comments: { type: String, required: true },
  });

  module.exports = mongoose.model('Waterintake', waterintakeSchema);  